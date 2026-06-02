import { useEffect, useState } from "react";
import api from "../services/api";

function Applications() {

    const [applications, setApplications] =
        useState([]);

    useEffect(() => {

        const fetchApplications =
            async () => {

                const response =
                    await api.get("/applications");

                setApplications(
                    response.data
                );
            };

        fetchApplications();

    }, []);

    return (
        <div>

            <h1>Applications</h1>

            {
                applications.map(
                    (application) => (

                        <div
                            key={application._id}
                            style={{
                                border:
                                "1px solid gray",
                                padding:"10px",
                                margin:"10px"
                            }}
                        >

                            <h3>
                                {
                                application.studentName
                                }
                            </h3>

                            <p>
                                {
                                application.studentEmail
                                }
                            </p>

                            <p>
                                Status:
                                {
                                application.status
                                }
                            </p>
                             <button
                onClick={async () => {

                    await api.patch(
                        `/applications/${application._id}`,
                        {
                            status: "Shortlisted"
                        }
                    );

                    window.location.reload();
                }}
            >
                Shortlist
            </button>

            <button
                onClick={async () => {

                    await api.patch(
                        `/applications/${application._id}`,
                        {
                            status: "Rejected"
                        }
                    );

                    window.location.reload();
                }}
            >
                Reject
            </button>

                        </div>

                    )
                )
            }

        </div>
    );
}

export default Applications;