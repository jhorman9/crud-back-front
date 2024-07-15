export const useStyles = () => {

    const styleList = {
        
        list:{
            maxHeight: '305px',
            overflowY: 'scroll',
            '&::WebkitScrollbar': {
                width: '10px',
            },
            '&::WebkitScrollbarTrack': {
                background: '#9c27b0',
            },
            '&::WebkitScrollbarThumb': {
                background: '#9c27b0',
            },
            '&::WebkitScrollbarThumb:hover': {
                background: '#555',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: '#9c27b0 transparent',
        },

        modal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }
    };

    return styleList;

}