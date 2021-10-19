import * as React from 'react';
import { ReactNode } from 'react';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal(props: { history: any, id: number }) {
    const [open, setOpen] = React.useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Button>
            <a target = "_blank" rel="noreferrer" href="https://forms.gle/sFc6VLs9oWtCzEAz9">Pesquisa Google</a>
            </Button>
            <Button onClick={() =>
                props.history.push('/FeedBack', {id: props.id})
            }>FeedBack</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export function NestedModal(props: { children: ReactNode, history: any, id: number }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>{props.children}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <ChildModal history = {props.history} id={props.id} />
                </Box>
            </Modal>
        </div>
    );
}