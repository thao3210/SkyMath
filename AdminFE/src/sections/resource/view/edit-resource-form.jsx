import * as yup from 'yup';
import { Formik } from "formik";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Box,
    Stack,
    Button,
    Select,
    MenuItem,
    TextField,
    InputLabel,
    Typography,
    FormControl,
    DialogContent,
} from '@mui/material';

import LoadingPage from '../../../pages/loading_page';
import ResourceServices from '../../../services/ResourceServices';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const resourceType = [
    { id: '1', name: 'Video' },
    { id: '2', name: 'Word' },
    { id: '3', name: 'PDF' },
];

const EditResourceForm = ({
    initialValues,
    showAlert,
    onLoadData,
    handleCloseEditResource,
}) => {
    const [resourceFile, setResourceFile] = useState(null);

    const [resourceFileName, setResourceFileName] = useState(null);

    const [selectedTypeResource, setSelectedTypeResource] = useState(initialValues.resourceTypeName);

    const [existFile, setExistFile] = useState(initialValues.content);

    const [typeResourceError, setTypeResourceError] = useState(null);

    const [typeError, setTypeError] = useState(null);

    const handleTypeResourceChange = (event) => {
        setSelectedTypeResource(event.target.value);
        setTypeResourceError(null);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (x) => {
                setResourceFileName(file.name);
                setResourceFile(file);
                setTypeError(null);
            };
            reader.readAsDataURL(file);
        } else {
            setResourceFile(null);
        }
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('This is a required field'),
    });

    const handleEditResource = async (values, { setSubmitting, resetForm }) => {
        try {
            if (!selectedTypeResource) {
                setTypeResourceError('Please select a resource type');
                setSubmitting(false);
                return;
            }

            if (!values.content && !resourceFile) {
                setTypeError('Content link or resource file must not null!');
                setSubmitting(false);
                return;
            }

            const formData = new FormData();
            formData.append('Name', values.name);
            formData.append('Content', values.content);
            formData.append('ContentFile', resourceFile ?? existFile);
            formData.append('ResourceTypeName', selectedTypeResource);
            const response = await ResourceServices.editResource(initialValues.id, formData);
            if (response.status === 204) {
                showAlert("success", "Edit resource successful!");
                resetForm();
                onLoadData();
                handleCloseEditResource();
            } else {
                showAlert("error", "Have something error when edit resource!");

            }
        } catch (error) {
            console.error('Failed to edit resource:', error);
            showAlert("error", "Have something error when edit resource!");

        }
    };

    useEffect(() => {
        if (selectedTypeResource === "Word" || selectedTypeResource === "PDF") {
            if (initialValues.content
                && (initialValues.content.endsWith('.pdf')
                    || initialValues.content.endsWith('.docx')
                    || initialValues.content.endsWith('.doc')
                    || initialValues.content.endsWith('.docs'))) {
                setExistFile(initialValues.content);
            } else {
                setExistFile(null);
            }
        }
    }, [selectedTypeResource, initialValues.content]);
    

    return (
        <Formik
            onSubmit={handleEditResource}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({
                values,
                errors,
                touched,
                isSubmitting,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                    {isSubmitting
                        ? <DialogContent>
                            <LoadingPage />
                        </DialogContent>
                        : <DialogContent>
                            <Stack spacing={3}>
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    label="Resource Name"
                                    variant="outlined"
                                    name="name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name ? values.name : ""}
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />

                                <FormControl fullWidth>
                                    <InputLabel id="select-type-label">Type</InputLabel>
                                    <Select
                                        labelId="select-type-label"
                                        id="type-select"
                                        value={selectedTypeResource}
                                        onChange={handleTypeResourceChange}
                                        label="Grade"
                                        MenuProps={MenuProps}
                                    >
                                        {resourceType.map((resourceTypeOption) => (
                                            <MenuItem key={resourceTypeOption.id} value={resourceTypeOption.name}>
                                                {resourceTypeOption.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Typography variant="caption" color="error">
                                        {typeResourceError}
                                    </Typography>
                                </FormControl>

                                {(() => {
                                    if (selectedTypeResource === "Word" || selectedTypeResource === "PDF") {
                                        return (
                                            <Stack direction="column" spacing={1}>
                                                <Typography variant='h6'>Resource File</Typography>

                                                <Typography variant="caption" color="text.primary">
                                                    {resourceFileName ?? existFile}
                                                </Typography>

                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload file

                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>

                                                <Typography variant="caption" color="error">
                                                    {typeError}
                                                </Typography>
                                            </Stack>
                                        );
                                    }

                                    if (selectedTypeResource === "Video") {
                                        if (values.content && values.content.endsWith('.pdf')
                                            || values.content.endsWith('.docx')
                                            || values.content.endsWith('.doc')
                                            || values.content.endsWith('.docs')) {
                                            values.content = "";
                                        }

                                        return (
                                            <>
                                                <TextField
                                                    margin="dense"
                                                    fullWidth
                                                    label="Content Link"
                                                    variant="outlined"
                                                    name="content"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.content ? values.content : ""}
                                                    error={!!touched.content && !!errors.content}
                                                    helperText={touched.content && errors.content}
                                                />

                                                <Typography variant="caption" color="error">
                                                    {typeError}
                                                </Typography>
                                            </>
                                        );
                                    }

                                    return null;
                                })()}


                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mt: 2 }}
                                >
                                    <Button variant="contained" color="primary" type='submit'>
                                        Edit Resource
                                    </Button>
                                    <Button variant="contained" color="warning" onClick={handleCloseEditResource}>
                                        Cancel
                                    </Button>
                                </Box>
                            </Stack>
                        </DialogContent>
                    }
                </form>
            )}
        </Formik>
    );
}

EditResourceForm.propTypes = {
    initialValues: PropTypes.shape({
        id: PropTypes.any,
        name: PropTypes.any,
        content: PropTypes.any,
        lessonId: PropTypes.any,
        resourceTypeName: PropTypes.any,
    }).isRequired,
    showAlert: PropTypes.func,
    onLoadData: PropTypes.func,
    handleCloseEditResource: PropTypes.func,
};


export default EditResourceForm;