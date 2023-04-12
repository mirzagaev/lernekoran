/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type QuranCreateFormInputValues = {
    sura?: string;
};
export declare type QuranCreateFormValidationValues = {
    sura?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type QuranCreateFormOverridesProps = {
    QuranCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    sura?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type QuranCreateFormProps = React.PropsWithChildren<{
    overrides?: QuranCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: QuranCreateFormInputValues) => QuranCreateFormInputValues;
    onSuccess?: (fields: QuranCreateFormInputValues) => void;
    onError?: (fields: QuranCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: QuranCreateFormInputValues) => QuranCreateFormInputValues;
    onValidate?: QuranCreateFormValidationValues;
} & React.CSSProperties>;
export default function QuranCreateForm(props: QuranCreateFormProps): React.ReactElement;
