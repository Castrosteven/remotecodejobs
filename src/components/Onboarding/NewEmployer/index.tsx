'use client'
import React, { useState } from 'react';


interface EmployerOnboardingFormProps {
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    companyName: string;
    industry: string;
    description: string;
    contactEmail: string;
}

const EmployerOnboardingForm: React.FC<EmployerOnboardingFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        industry: '',
        description: '',
        contactEmail: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <div className="p-4 space-y-4">
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        Company Name
                        <input
                            type="text"
                            className="input input-bordered"
                            value={formData.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                        />
                    </label>
                </div>

                <div className="form-control">
                    <label className="label">
                        Industry
                        <select
                            className="select select-bordered"
                            value={formData.industry}
                            onChange={(e) => handleChange('industry', e.target.value)}
                        >
                            <option value="tech">Tech</option>
                            <option value="finance">Finance</option>
                            {/* Add more industry options */}
                        </select>
                    </label>
                </div>

                <div className="form-control">
                    <label className="label">
                        Company Description
                        <textarea
                            className="textarea textarea-bordered"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                        />
                    </label>
                </div>

                <div className="form-control">
                    <label className="label">
                        Contact Email
                        <input
                            type="email"
                            className="input input-bordered"
                            value={formData.contactEmail}
                            onChange={(e) => handleChange('contactEmail', e.target.value)}
                        />
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EmployerOnboardingForm
