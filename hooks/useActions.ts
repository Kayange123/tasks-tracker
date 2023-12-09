"use client";
import { ActionState, FieldErrors } from "@/lib/createActions";
import { useCallback, useState } from "react";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);

      try {
        const result = await action(input);

        if (!result) {
          return;
        }

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};

// type Action<TInput, TOutput> = (
//   data: TInput
// ) => Promise<ActionState<TInput, TOutput>>;

// interface UseActionProps<TInput, TOutput> {
//   onSuccess?: (data: TInput) => void;
//   onError?: (error: string) => void;
//   onComplete?: () => void;
// }

// export const useAction = <Input, Output>(
//   action: Action<Input, Output>,
//   options: UseActionProps<Input, Output>
// ) => {
//   const [fieldErrors, setFieldErrors] = useState<
//     FieldErrors<Input> | undefined
//   >(undefined);
//   const [errors, setErrors] = useState<string | undefined>(undefined);
//   const [data, setData] = useState<Output | undefined>(undefined);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const execute = useCallback(
//     async (data: Input) => {
//       setIsLoading(true);
//       try {
//         const result = await action(data);
//         if (!result) return;

//         setFieldErrors(result.fieldErrors);

//         if (result.error) {
//           setErrors(result.error);
//           options.onError?.(result?.error);
//         }
//         if (result.data) {
//           setData(result?.data);
//           options.onSuccess?.(result?.data);
//         }
//       } finally {
//         setIsLoading(false);
//         options?.onComplete?.();
//       }
//     },
//     [action, options]
//   );

//   return { execute, fieldErrors, errors, isLoading, data };
// };
