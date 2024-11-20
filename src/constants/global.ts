export const BloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const Gender = ["Male", "Female", "Other"];

export const genderOptions = Gender.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroupOptions = BloodGroup.map((item) => ({
  value: item,
  label: item,
}));
