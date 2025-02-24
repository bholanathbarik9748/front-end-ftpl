export const globalFormHandler = <T extends object>(
  id: keyof T,
  value: string,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  setFormData((prev) => ({ ...prev, [id]: value }));
};
