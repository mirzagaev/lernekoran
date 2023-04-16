/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Skills } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SkillsUpdateFormInputValues = {
    teilnehmer?: string;
    state?: number;
    createdAt?: string;
    updatedAt?: string;
};
export declare type SkillsUpdateFormValidationValues = {
    teilnehmer?: ValidationFunction<string>;
    state?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SkillsUpdateFormOverridesProps = {
    SkillsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    teilnehmer?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SkillsUpdateFormProps = React.PropsWithChildren<{
    overrides?: SkillsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    skills?: Skills;
    onSubmit?: (fields: SkillsUpdateFormInputValues) => SkillsUpdateFormInputValues;
    onSuccess?: (fields: SkillsUpdateFormInputValues) => void;
    onError?: (fields: SkillsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SkillsUpdateFormInputValues) => SkillsUpdateFormInputValues;
    onValidate?: SkillsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SkillsUpdateForm(props: SkillsUpdateFormProps): React.ReactElement;
