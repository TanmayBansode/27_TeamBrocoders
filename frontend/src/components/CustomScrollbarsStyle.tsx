// Custom Scrollbars Style
const CustomScrollbarsStyle = () => {
    return (
        <style jsx global>{`
            /* Custom Scrollbar Styles */
            ::-webkit-scrollbar {
                width: 10px;
            }
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
            .dark ::-webkit-scrollbar-track {
                background: #2d3748;
            }
            .dark ::-webkit-scrollbar-thumb {
                background: #4a5568;
            }
            .dark ::-webkit-scrollbar-thumb:hover {
                background: #718096;
            }
        `}</style>
    );
};

export default CustomScrollbarsStyle;