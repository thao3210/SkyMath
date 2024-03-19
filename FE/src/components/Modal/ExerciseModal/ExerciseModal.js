import React from 'react';

const QuestionModal = ({ isOpen, onClose, onAnswerSubmit }) => {
    return (
        <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>What is correct answer</p>
                        <button className="btn btn-primary" onClick={() => onAnswerSubmit('correctAnswer')}>
                            Correct
                        </button>
                        <button className="btn btn-secondary" onClick={() => onAnswerSubmit('incorrectAnswer')}>
                            Incorrect
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionModal;
