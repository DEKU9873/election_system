import { useState } from 'react';

export const useUserData = () => {
  // البيانات الأولية
  const [data] = useState([
    {
      id: "1",
      name: "أحمد محمد",
      phone: "0501234567",
      birthYear: "1990",
      registrationDate: "2023-01-15",
      registrationMethod: "حضوري",
      location: [24.7136, 46.6753],
    },
    {
      id: "2",
      name: "فاطمة علي",
      phone: "0512345678",
      birthYear: "1988",
      registrationDate: "2023-02-20",
      registrationMethod: "إلكتروني",
      location: [21.4858, 39.1925],
    },
    {
      id: "3",
      name: "محمد السيد",
      phone: "0523456789",
      birthYear: "1995",
      registrationDate: "2023-03-10",
      registrationMethod: "حضوري",
      location: [26.3927, 43.9637],
    },
    {
      id: "4",
      name: "سارة أحمد",
      phone: "0534567890",
      birthYear: "1992",
      registrationDate: "2023-04-05",
      registrationMethod: "إلكتروني",
      location: [24.0889, 38.0487],
    },
    {
      id: "5",
      name: "عمر حسن",
      phone: "0545678901",
      birthYear: "1987",
      registrationDate: "2023-05-12",
      registrationMethod: "حضوري",
      location: [28.3935, 36.572],
    },
    {
      id: "6",
      name: "نور الدين",
      phone: "0556789012",
      birthYear: "1993",
      registrationDate: "2023-06-18",
      registrationMethod: "إلكتروني",
      location: [25.396, 49.5937],
    },
    {
      id: "7",
      name: "ليلى محمود",
      phone: "0567890123",
      birthYear: "1991",
      registrationDate: "2023-07-22",
      registrationMethod: "حضوري",
      location: [18.2164, 42.5053],
    },
    {
      id: "8",
      name: "يوسف عبدالله",
      phone: "0578901234",
      birthYear: "1989",
      registrationDate: "2023-08-30",
      registrationMethod: "إلكتروني",
      location: [16.8892, 42.5611],
    },
    {
      id: "9",
      name: "مريم صالح",
      phone: "0589012345",
      birthYear: "1994",
      registrationDate: "2023-09-14",
      registrationMethod: "حضوري",
      location: [27.5236, 41.6936],
    },
    {
      id: "10",
      name: "كريم فتحي",
      phone: "0590123456",
      birthYear: "1986",
      registrationDate: "2023-10-25",
      registrationMethod: "إلكتروني",
      location: [30.0978, 40.2854],
    },
  ]);

   const  [electedData] = useState([
        {
          id: "1",
          name: "الحسن محمد",
          phone: "07717234",
          state: "مفعل",
          addBy: "باسم",
          location: [30.0978, 40.2854],
        },
        {
          id: "2",
          name: "محمد حسن",
          phone: "07717234",
          state: "مفعل",
          addBy: "باسم",
          location: [30.0978, 40.2854],
        },
        {
          id: "3",
          name: "مريم محمد",
          phone: "07717234",
          state: "مفعل",
          addBy: "الحسن",
          location: [30.0978, 40.2854],
        },
  ])

  const [coordinatorData] = useState([
    {
      id: "1",
      name: "احمد عبدالله",
      phone: "07717234",
      numberOfCenters: "3",
      location: [30.0978, 40.2854],
    },
  ]);

  const [usersData] = useState([
    {
      id: "1",
      name: "احمد عبدالله",
      phone: "07717234",
      pollingCenter: "مدرسة الكرخ",
      addBy: "علي",
      registrationDate: "2023-01-01",
      location: [30.0978, 40.2854],
    },
    {
      id: "2",
      name: "محمد عبدالله",
      phone: "07717234",
      pollingCenter: "مدرسة الكرخ",
      addBy: "علي",
      registrationDate: "2023-01-01",
      location: [30.0978, 40.2854],
    },
  ]);

  const governorateData = [
    {
      id: "1",
      code: "123",
      name: "بغداد",
      numberOfElections: "2",
      numberOfCenters: "10",
      numberOfElected: "5",
      numberOfVoters: "100",
      percentageOfVoters: "50%",
    },
    {
      id: "2",
      code: "456",
      name: "البصرة",
      numberOfElections: "1",
      numberOfCenters: "5",
      numberOfElected: "3",
      numberOfVoters: "80",
      percentageOfVoters: "30%",
    },
  ];

  const districtsData = [
    {
      id: "1",
      name: "ابوغريب",
      governorate: "بغداد",
      numberOfSubdistricts: "3",
      numberOfElections: "2",
      numberOfCenters: "10",
      numberOfElected: "5",
      numberOfVoters: "100",
      percentageOfVoters: "50%",
    },
    {
      id: "2",
      name: "المحمودية",
      governorate: "بغداد",
      numberOfSubdistricts: "2",
      numberOfElections: "1",
      numberOfCenters: "5",
      numberOfElected: "3",
      numberOfVoters: "80",
      percentageOfVoters: "30%",
    },
  ]
  const subdistrictsData = [
    {
      id: "1",
      name: "الحي",
      district: "ابوغريب",
      governorate: "بغداد",
      numberOfSubdistricts: "3",
      numberOfElections: "2",
      numberOfCenters: "10",
      numberOfElected: "5",
      numberOfVoters: "100",
      percentageOfVoters: "50%",
    },
    {
      id: "2",
      name: "الحي",
      district: "ابوغريب",
      governorate: "بغداد",
      numberOfSubdistricts: "2",
      numberOfElections: "1",
      numberOfCenters: "5",
      numberOfElected: "3",
      numberOfVoters: "80",
      percentageOfVoters: "30%",
    },
  ]

  const CenterManagersData = [
    {
      id: "1",
      name: "محمد",
      phone: "07717234",
      pollingCenter: "مركز 1",
      governorate: "بغداد",
      district: "ابوغريب",
    },
    {
      id: "2",
      name: "مريم",
      phone: "07717234",
      pollingCenter: "مركز 2",
      governorate: "بغداد",
      district: "المحمودية",
    },
  ]
  const districtManagersData = [
    {
      id: "1",
      name: "محمد",
      phone: "07717234",
      governorate: "بغداد",
      district: "ابوغريب",
    },
    {
      id: "2",
      name: "مريم",
      phone: "07717234",
      governorate: "بغداد",
      district: "المحمودية",
    },
  ]
  const electoralStripsData = [
    {
      id: "1",
      pollingCenter: "مركز 1",
      station: "محطة 1",
      electionDayDate: "2023-01-01",
      uploadedBy: "الحسن",
      uploadDate: "2023-01-01",
      state: "مقبول",
    },
    
  ]
  return { data, electedData, coordinatorData, usersData, governorateData, districtsData,subdistrictsData, CenterManagersData, districtManagersData, electoralStripsData  };
};