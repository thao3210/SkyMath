import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import urlExam from '../../../assets/documents/math.pdf';
import './FlipBookModal.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function FlipBookModal() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfLoading, setPdfLoading] = useState(true); // Track PDF loading state

    useEffect(() => {
        // Initialize PDF when component mounts
        const loadPdf = async () => {
            try {
                const pdf = await pdfjs.getDocument(urlExam).promise;
                setNumPages(pdf.numPages);
                setPageNumber(1);
                setPdfLoading(false);
            } catch (error) {
                console.error('Error loading PDF:', error);
                setPdfLoading(false); // Update loading state on error
            }
        };

        loadPdf();
    }, []);

    const onFlip = useCallback((e) => {
        setCurrentPage(e.data);
    }, []);

    const book = useRef();

    return (
        <div className="modal modal-xl fade" id="flipBookModal" tabIndex="-1" aria-labelledby="flipBookModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="flipBookModalLabel">Book name</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <div className="">
                                {pdfLoading ? (
                                    <div>Loading PDF...</div>
                                ) : (
                                    <div className='d-flex flex-column align-items-center justify-content-center'>
                                        <HTMLFlipBook
                                            width={420}
                                            height={600}
                                            onFlip={onFlip}
                                            ref={book}
                                            className='bg-success'
                                        >
                                            {Array.from(new Array(numPages), (el, index) => (
                                                <div key={`page_${index + 1}`} className="">

                                                    <Document file={urlExam} >
                                                        <Page
                                                            pageNumber={index + 1}
                                                            renderTextLayer={false}
                                                            renderAnnotationLayer={false}
                                                            width={420}
                                                        />
                                                    </Document>
                                                </div>
                                            ))}
                                        </HTMLFlipBook>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className='d-flex gap-3 align-items-center justify-content-center mt-2'>
                            <button onClick={() => book.current.pageFlip().flipPrev()} className='btn btn-outline-dark py-1'><i className='fa-solid fa-angle-left'></i></button>
                            <span>{currentPage} of {numPages}</span>
                            <button onClick={() => book.current.pageFlip().flipNext()} className='btn btn-outline-dark py-1'><i className='fa-solid fa-angle-right'></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FlipBookModal;