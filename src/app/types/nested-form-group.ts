import { FormControl, FormGroup } from '@angular/forms';

export type NestedPrimitive<T> = {
  [K in keyof T]: string | number | boolean | NestedPrimitive<T[K] & object>;
};

/**
 * Converts a nested object type or interface into a `FormGroup` structure
 * where each property is represented as a `FormControl` or a nested `FormGroup`.
 *
 * @typeParam T - The nested object type or interface to be converted.
 *                It must extend `NestedPrimitive<T>`.
 *
 * @example
 * ```ts
 * type ExampleType = {
 *   name: string;
 *   active: boolean;
 *  address: {
 *     street: string;
 *     streetNumber: number;
 *  };
 * };
 * type ExampleFormGroup = NestedFormGroup<ExampleType>;
 * ```
 */
export type NestedFormGroup<T extends NestedPrimitive<T>> = FormGroup<{
  [K in keyof T]: T[K] extends string
    ? FormControl<string>
    : T[K] extends number
      ? FormControl<number>
      : T[K] extends boolean
        ? FormControl<boolean>
        : T[K] extends object
          ? NestedFormGroup<T[K]>
          : never;
}> & {};
