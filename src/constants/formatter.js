[
  "{{repeat(5, 7)}}",
  {
    name: {
      firstName: "{{firstName()}}",
      middleName: "{{firstName()}}",
      lastName: "{{surname()}}",
    },
    gender: '{{random("male", "female")}}',
    email: "{{email()}}",
    contactNo: "{{phone()}}",
    emergencyContactNo: "{{phone()}}",
    bloodGroup: '{{random("O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-")}}',
    presentAddress:
      "{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(10000, 99999)}}",
    permanentAddress:
      "{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(10000, 99999)}}",
    gurdian: {
      fatherName: "{{firstName()}} {{surname()}}",
      fatherOccupation:
        '{{random("Engineer", "Doctor", "Teacher", "Lawyer", "Businessman")}}',
      fatherContactNo: "{{phone()}}",
      motherName: "{{firstName()}} {{surname()}}",
      motherOccupation:
        '{{random("Engineer", "Doctor", "Teacher", "Lawyer", "Businesswoman")}}',
      motherContactNo: "{{phone()}}",
    },
    localGuardians: {
      name: "{{firstName()}} {{surname()}}",
      contactNo: "{{phone()}}",
      occupation:
        '{{random("Engineer", "Doctor", "Teacher", "Lawyer", "Businessperson")}}',
      address:
        "{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(10000, 99999)}}",
    },
  },
];
