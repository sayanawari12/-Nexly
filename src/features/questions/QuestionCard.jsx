import React, { memo } from 'react';
import { motion } from 'framer-motion';
import LazyThumbnail from './LazyThumbnail';
import { formatQuestionLabel } from './utils/questionsConfig';

/**
 * QuestionCard — one card per question (per PDF page).
 *
 * Props:
 *   questionNumber {number}  — 1-indexed
 *   totalQuestions {number}  — for zero-padding label
 *   pdfUrl         {string}  — PDF source URL
 *   onClick        {func}    — called when the card is clicked
 */
const QuestionCard = memo(({ questionNumber, totalQuestions, pdfUrl, onClick }) => {
  const label = formatQuestionLabel(questionNumber, totalQuestions);

  return (
    <motion.article
      className="qc-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${label}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="qc-card-header">
        <span className="qc-question-badge">{label}</span>
        <span className="qc-page-badge">Pg {questionNumber}</span>
      </div>

      {/* Thumbnail */}
      <div className="qc-thumb-wrapper">
        <LazyThumbnail
          pdfUrl={pdfUrl}
          pageNumber={questionNumber}
          width={220}
        />
      </div>

      {/* Footer */}
      <div className="qc-card-footer">
        <span className="qc-open-label">Open →</span>
      </div>

      {/* Hover glow */}
      <div className="qc-hover-glow" aria-hidden="true" />
    </motion.article>
  );
});

QuestionCard.displayName = 'QuestionCard';

export default QuestionCard;
