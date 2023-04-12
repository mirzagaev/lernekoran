/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Quran } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function QuranUpdateForm(props) {
  const {
    id: idProp,
    quran: quranModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    nr: "",
    sura: "",
  };
  const [nr, setNr] = React.useState(initialValues.nr);
  const [sura, setSura] = React.useState(initialValues.sura);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = quranRecord
      ? { ...initialValues, ...quranRecord }
      : initialValues;
    setNr(cleanValues.nr);
    setSura(cleanValues.sura);
    setErrors({});
  };
  const [quranRecord, setQuranRecord] = React.useState(quranModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Quran, idProp)
        : quranModelProp;
      setQuranRecord(record);
    };
    queryData();
  }, [idProp, quranModelProp]);
  React.useEffect(resetStateValues, [quranRecord]);
  const validations = {
    nr: [],
    sura: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          nr,
          sura,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Quran.copyOf(quranRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "QuranUpdateForm")}
      {...rest}
    >
      <TextField
        label="Nr"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={nr}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              nr: value,
              sura,
            };
            const result = onChange(modelFields);
            value = result?.nr ?? value;
          }
          if (errors.nr?.hasError) {
            runValidationTasks("nr", value);
          }
          setNr(value);
        }}
        onBlur={() => runValidationTasks("nr", nr)}
        errorMessage={errors.nr?.errorMessage}
        hasError={errors.nr?.hasError}
        {...getOverrideProps(overrides, "nr")}
      ></TextField>
      <TextField
        label="Sura"
        isRequired={true}
        isReadOnly={false}
        value={sura}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nr,
              sura: value,
            };
            const result = onChange(modelFields);
            value = result?.sura ?? value;
          }
          if (errors.sura?.hasError) {
            runValidationTasks("sura", value);
          }
          setSura(value);
        }}
        onBlur={() => runValidationTasks("sura", sura)}
        errorMessage={errors.sura?.errorMessage}
        hasError={errors.sura?.hasError}
        {...getOverrideProps(overrides, "sura")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || quranModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || quranModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
