import React, { useState } from "react";
import { Authenticator, View, Autocomplete, SelectField } from '@aws-amplify/ui-react';

function Register() {
    const [organisationsname, setOrga] = useState('');

    const onChange = (event) => {
        setOrga(event.target.value);
    };

    // It is your responsibility to set up onSelect
    const onSelect = (option) => {
        const { label } = option;
        setOrga(label);
    };

    // It is your responsibility to set up onClear
    const onClear = () => {
        setOrga('');
    };

    const organisationen = [
        { id: 'apple', label: 'apple' },
        { id: 'banana', label: 'banana' },
        { id: 'cherry', label: 'cherry' },
        { id: 'grape', label: 'grape' },
        { id: 'kiwis', label: 'kiwis' },
        { id: 'lemon', label: 'lemon' },
        { id: 'mango', label: 'mango' },
        { id: 'orange', label: 'orange' },
        { id: 'strawberry', label: 'strawberry' },
    ];

    return (
        <View className="grid h-screen bg-gray-100 auth-wrapper place-items-center">
            <Authenticator
                loginMechanisms={['email']}
                // Default to Sign Up screen
                initialState="signUp"
                // Customize `Authenticator.SignUp.FormFields`
                components={{
                SignUp: {
                    FormFields() {
                        return (
                            <>
                            {/* Re-use default `Authenticator.SignUp.FormFields` */}
                            <Authenticator.SignUp.FormFields />
            
                            {/* Append & require Terms & Conditions field to sign up  */}
                            <SelectField label="Rolle" name="rolle" required>
                                <option>Bitte wählen Sie Ihre Rolle aus</option>
                                <option value="Organisator">Organisator</option>
                                <option value="Teacher">Lehrer</option>
                                <option value="Member">Schüler</option>
                            </SelectField>

                            <Autocomplete
                                label="Organisation"
                                name="organisationen"
                                options={organisationen}
                                value={organisationsname}
                                onChange={onChange}
                                onClear={onClear}
                                onSelect={onSelect}
                                labelHidden={false}
                                placeholder="Bitte wählen Sie eine Organisation aus"
                            />
                            </>
                        );
                    },
                },
                }}
                services={{
                    async validateCustomSignUp(formData) {
                        console.log("Rolle", formData.rolle);
                        console.log("Organisation", organisationsname);
                        // if (!formData.acknowledgement) {
                        //     return {
                        //         acknowledgement: 'You must agree to the Terms & Conditions',
                        //     };
                        // }
                        // if (formData.rolle === "Organisator") {
                        //     formData.neworganisation.isDisabled = false;
                        // }
                    },
                }}
            >
                {({ signOut, user }) => (
                <main>
                    <h1>Hello {user.username}</h1>
                    <button onClick={signOut}>Sign out</button>
                </main>
                )}
            </Authenticator>
        </View>
    );
}

export default Register;