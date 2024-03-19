import PropTypes from 'prop-types';
import { useState, useEffect } from "react";

import { DialogContent } from '@mui/material';

import EditResourceForm from "./edit-resource-form";
import LoadingPage from "../../../pages/loading_page";
import ResourceServices from '../../../services/ResourceServices';

const EditResourceView = ({
    resourceId,
    showAlert,
    onLoadData,
    handleCloseEditResource
}) => {
    const [resourceData, setResourceData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ResourceServices.getResourceById(resourceId);
                console.log("response: ", response);
                if (response?.data && response?.status === 200) {
                    setResourceData(response.data);
                } else {
                    console.error(response ?? "Unexpected response structure");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [resourceId]);

    return (
        <div>
            {resourceData ? (
                <EditResourceForm
                    initialValues={resourceData}
                    showAlert={showAlert}
                    onLoadData={onLoadData}
                    handleCloseEditResource={handleCloseEditResource}
                />
            ) : (
                <DialogContent>
                    <LoadingPage />
                </DialogContent>
            )}
        </div>
    );
};

EditResourceView.propTypes = {
    resourceId: PropTypes.any,
    showAlert: PropTypes.func,
    onLoadData: PropTypes.func,
    handleCloseEditResource: PropTypes.func,
};

export default EditResourceView;
