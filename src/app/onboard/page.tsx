'use client'
import EmployerOnboardingForm from "@/components/Onboarding/NewEmployer"

interface FormData {
    companyName: string;
    industry: string;
    description: string;
    contactEmail: string;
}
const Onboard = () => {
    const handleOnSubmit = (formData: FormData) => {
        console.log('Form data submitted:', formData);
        // Here you can send the form data to your API or perform other actions
    };


    return (
        <div className=" min-h-screen p-6">
            <EmployerOnboardingForm onSubmit={handleOnSubmit} />
        </div>
    )
}

export default Onboard