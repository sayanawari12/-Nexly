import { calculateSubjectProgress, calculateSemesterProgress } from '../roadmap/roadmapService';

/**
 * Generate all study analytics, trends, and dynamic insights.
 */
export const calculateStudyAnalytics = (
  progressList = [], 
  subjects = [], 
  units = [], 
  lessons = [], 
  profileData = null
) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  
  // Weekly limits
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfWeekTime = startOfWeek.getTime();

  // Monthly limits
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  // Time calculations (raw values in seconds, convert to minutes/hours for UI)
  let todayTimeSeconds = 0;
  let weeklyTimeSeconds = 0;
  let monthlyTimeSeconds = 0;
  let totalTimeSeconds = 0;

  let longestSessionSeconds = 0;

  // Active days count in this week
  const weekDaysActive = new Set();
  // Weekly graph tracker: Map day indexes (0-6) to counters
  const dailyStudyMap = Array(7).fill(0).map(() => ({ minutes: 0, completedCount: 0 }));

  progressList.forEach(p => {
    const timeSpent = p.timeSpent || 0;
    totalTimeSeconds += timeSpent;

    if (timeSpent > longestSessionSeconds) {
      longestSessionSeconds = timeSpent;
    }

    const lastOpenedTime = p.lastOpened ? new Date(p.lastOpened).getTime() : 0;
    const completedAtTime = p.completedAt ? new Date(p.completedAt).getTime() : 0;

    // Check Today
    if (lastOpenedTime >= startOfDay) {
      todayTimeSeconds += timeSpent;
    }

    // Check Week
    if (lastOpenedTime >= startOfWeekTime) {
      weeklyTimeSeconds += timeSpent;
      const dayIndex = new Date(p.lastOpened).getDay();
      weekDaysActive.add(dayIndex);
      dailyStudyMap[dayIndex].minutes += Math.round(timeSpent / 60);
    }

    if (completedAtTime >= startOfWeekTime) {
      const dayIndex = new Date(p.completedAt).getDay();
      dailyStudyMap[dayIndex].completedCount += 1;
    }

    // Check Month
    if (lastOpenedTime >= startOfMonth) {
      monthlyTimeSeconds += timeSpent;
    }
  });

  // Average session length: total minutes divided by items attempted
  const totalSessions = progressList.length || 1;
  const averageSessionLengthMinutes = Math.round((totalTimeSeconds / 60) / totalSessions);

  // Weekly Graph Data array formatting (Sun -> Sat)
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyGraphData = dailyStudyMap.map((data, index) => ({
    day: weekdays[index],
    minutes: data.minutes,
    completed: data.completedCount
  }));

  // Find most active and least active day this week
  let maxMinutes = -1;
  let minMinutes = Infinity;
  let mostActiveDay = 'None';
  let leastActiveDay = 'None';

  weeklyGraphData.forEach((d) => {
    if (d.minutes > maxMinutes) {
      maxMinutes = d.minutes;
      mostActiveDay = d.day;
    }
    if (d.minutes < minMinutes) {
      minMinutes = d.minutes;
      leastActiveDay = d.day;
    }
  });

  if (maxMinutes === 0) mostActiveDay = 'No session';
  if (minMinutes === Infinity || minMinutes === 0) leastActiveDay = 'No session';

  // Subject Metrics
  const subjectAnalyticsList = subjects.map(subject => {
    const progress = calculateSubjectProgress(subject.id, units, lessons, new Set(
      progressList.filter(p => p.status === 'completed').map(p => p.lessonId)
    ), new Set(
      progressList.filter(p => p.status === 'in-progress' || p.status === 'revisit').map(p => p.lessonId)
    ));

    const subjectProgressList = progressList.filter(p => p.subjectId === subject.id);
    const subjectTime = subjectProgressList.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    
    // Last studied formatted date
    const sortedOpened = [...subjectProgressList].sort((a, b) => new Date(b.lastOpened || 0) - new Date(a.lastOpened || 0));
    const lastOpenedStr = sortedOpened[0]?.lastOpened
      ? new Date(sortedOpened[0].lastOpened).toLocaleDateString()
      : 'Never';

    // Calculate units completed inside this subject
    const subjectUnits = units.filter(u => u.subjectId === subject.id);
    let unitsCompletedCount = 0;
    subjectUnits.forEach(unit => {
      const unitLessons = lessons.filter(l => l.unitId === unit.id);
      const completedSet = new Set(progressList.filter(p => p.status === 'completed').map(p => p.lessonId));
      const completedUnitLessons = unitLessons.filter(l => completedSet.has(String(l.id)) || completedSet.has(Number(l.id)));
      if (unitLessons.length > 0 && completedUnitLessons.length === unitLessons.length) {
        unitsCompletedCount++;
      }
    });

    return {
      id: subject.id,
      name: subject.title,
      code: subject.code || 'Core',
      completionPercentage: progress.percentage,
      lessonsCompleted: progress.completed,
      totalLessons: progress.total,
      unitsCompleted: unitsCompletedCount,
      totalUnits: subjectUnits.length,
      studyTimeMinutes: Math.round(subjectTime / 60),
      lastStudied: lastOpenedStr,
      status: progress.percentage === 100 ? 'Completed' : progress.percentage > 0 ? 'In Progress' : 'Not Started'
    };
  });

  // Dynamic Learning Insights
  const insights = [];
  const completedCount = progressList.filter(p => p.status === 'completed').length;
  
  insights.push(`You completed ${completedCount} lessons overall.`);
  insights.push(`You studied ${weekDaysActive.size} days this week.`);

  // Find strongest subject (highest completion percentage)
  let strongestSubject = null;
  let maxPercentage = -1;
  subjectAnalyticsList.forEach(s => {
    if (s.completionPercentage > maxPercentage) {
      maxPercentage = s.completionPercentage;
      strongestSubject = s;
    }
  });

  if (strongestSubject && maxPercentage > 0) {
    insights.push(`${strongestSubject.name} is your strongest subject with ${maxPercentage}% progress.`);
  }

  // Find neglected subjects (not studied for > 7 days)
  subjectAnalyticsList.forEach(s => {
    if (s.lastStudied !== 'Never') {
      const diffTime = Math.abs(now.getTime() - new Date(s.lastStudied).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 7) {
        insights.push(`You haven't opened ${s.name} for ${diffDays} days.`);
      }
    }
  });

  // Add overall Semester 2 completion insight
  const semProgress = calculateSemesterProgress('semester-2', subjects, units, lessons, new Set(
    progressList.filter(p => p.status === 'completed').map(p => p.lessonId)
  ));
  insights.push(`You are ${semProgress}% through Semester 2.`);

  return {
    todayTimeMinutes: Math.round(todayTimeSeconds / 60),
    weeklyTimeMinutes: Math.round(weeklyTimeSeconds / 60),
    monthlyTimeMinutes: Math.round(monthlyTimeSeconds / 60),
    totalTimeHours: parseFloat((totalTimeSeconds / 3600).toFixed(1)),
    averageDailyStudyMinutes: Math.round((weeklyTimeSeconds / 60) / 7),
    longestStudySessionMinutes: Math.round(longestSessionSeconds / 60),
    averageSessionLengthMinutes,
    mostActiveDay,
    leastActiveDay,
    weeklyGraphData,
    subjectAnalyticsList,
    insights,
    streakCount: profileData?.learningStats?.currentStreak || profileData?.streak || 0,
    longestStreak: profileData?.learningStats?.longestStreak || profileData?.streak || 5
  };
};
