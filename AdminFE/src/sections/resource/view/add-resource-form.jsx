import * as yup from 'yup';
import { Formik } from "formik";
import { useState } from 'react';
import PropTypes from 'prop-types';

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

const initialValues = {
    resourceName: '',
    contentLink: '',
};

const validationSchema = yup.object().shape({
    resourceName: yup.string().required('This is a required field'),
});

const resourceType = [
    { id: '1', name: 'Video' },
    { id: '2', name: 'Word' },
    { id: '3', name: 'PDF' },
];

const AddResourceForm = ({
    lessonId,
    showAlert,
    onLoadData,
    handleCloseAddResourceDialog
}) => {

    const [resourceFile, setResourceFile] = useState(null);

    const [resourceFileName, setResourceFileName] = useState(null);

    const [selectedTypeResource, setSelectedTypeResource] = useState('');

    const [typeResourceError, setTypeResourceError] = useState(null);

    const [typeError, setTypeError] = useState(null);

    const handleTypeResourceChange = (event) => {
        setSelectedTypeResource(event.target.value);
        setTypeResourceError(null);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setResourceFileName(file.name);
                setResourceFile(file);
                setTypeError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddResource = async (values, { setSubmitting, resetForm }) => {
        try {
            if (!selectedTypeResource) {
                setTypeResourceError('Please select a resource type');
                setSubmitting(false);
                return;
            }

            if (!values.contentLink && !resourceFile) {
                setTypeError('Content link or resource file must not null!');
                setSubmitting(false);
                return;
            }

            const formData = new FormData();
            formData.append('Name', values.resourceName);
            formData.append('Content', values.contentLink);
            formData.append('ContentFile', resourceFile);
            formData.append('ResourceTypeName', selectedTypeResource);
            formData.append('LessonId', lessonId);
            const response = await ResourceServices.addResource(formData);
            if (response.status === 201) {
                showAlert("success", "Add resource successful!");
                resetForm();
                onLoadData();
                handleCloseAddResourceDialog();
            } else {
                showAlert("error", "Have something error when add resource!");

            }
        } catch (error) {
            console.error('Failed to add thematic:', error);
            showAlert("error", "Have something error when add resource!");

        }
    };

    return (
        <Formik
            onSubmit={handleAddResource}
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
                                    name="resourceName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.resourceName ? values.resourceName : ""}
                                    error={!!touched.resourceName && !!errors.resourceName}
                                    helperText={touched.resourceName && errors.resourceName}
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
                                    if (selectedTypeResource === "Video") {
                                        return (
                                            <>
                                                <TextField
                                                    margin="dense"
                                                    fullWidth
                                                    label="Content Link"
                                                    variant="outlined"
                                                    name="contentLink"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.contentLink ? values.contentLink : ""}
                                                    error={!!touched.contentLink && !!errors.contentLink}
                                                    helperText={touched.contentLink && errors.contentLink}
                                                />

                                                <Typography variant="caption" color="error">
                                                    {typeError}
                                                </Typography></>
                                        );
                                    }

                                    if (selectedTypeResource === "Word" || selectedTypeResource === "PDF") {
                                        return (
                                            <Stack direction="column" spacing={1}>
                                                <Typography variant='h6'>Resource File</Typography>

                                                <Typography variant="caption" color="text.primary">
                                                    {resourceFileName}
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
                                    return null;
                                })()}


                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mt: 2 }}
                                >
                                    <Button variant="contained" color="primary" type='submit'>
                                        Add Resource
                                    </Button>
                                    <Button variant="contained" color="warning" onClick={handleCloseAddResourceDialog}>
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

AddResourceForm.propTypes = {
    lessonId: PropTypes.any,
    showAlert: PropTypes.func,
    onLoadData: PropTypes.func,
    handleCloseAddResourceDialog: PropTypes.func,
};


export default AddResourceForm;