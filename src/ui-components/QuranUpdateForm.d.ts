/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Quran } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type QuranUpdateFormInputValues = {
    nr?: number;
    sura?: string;
};
export declare type QuranUpdateFormValidationValues = {
    nr?: ValidationFunction<number>;
    sura?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type QuranUpdateFormOverridesProps = {
    QuranUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nr?: PrimitiveOverrideProps<TextFieldProps>;
    sura?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type QuranUpdateFormProps = React.PropsWithChildren<{
    overrides?: QuranUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    quran?: Quran;
    onSubmit?: (fields: QuranUpdateFormInputValues) => QuranUpdateFormInputValues;
    onSuccess?: (fields: QuranUpdateFormInputValues) => void;
    onError?: (fields: QuranUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: QuranUpdateFormInputValues) => QuranUpdateFormInputValues;
    onValidate?: QuranUpdateFormValidationValues;
} & React.CSSProperties>;
export default function QuranUpdateForm(props: QuranUpdateFormProps): React.ReactElement;
