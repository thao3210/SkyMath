import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import urlExam from '../../assets/documents/math.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Flip = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
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
        <div>
            <div className="container bg-warning py-3 overflow-x-hidden">
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
                        <div className='d-flex gap-3 align-items-center justify-content-center mt-2'>
                            <button onClick={() => book.current.pageFlip().flipPrev()} className='btn btn-outline-dark py-1'><i className='fa-solid fa-angle-left'></i></button>
                            <span>{currentPage} of {numPages}</span>
                            <button onClick={() => book.current.pageFlip().flipNext()} className='btn btn-outline-dark py-1'><i className='fa-solid fa-angle-right'></i></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Flip;
