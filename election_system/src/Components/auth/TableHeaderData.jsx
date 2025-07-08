import { User } from "lucide-react";

export const tableHeaders = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    shortLabel: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "full_name",
    label: "الاسم",
    shortLabel: "الاسم",
    sortable: true,
    icon: User,
  },
  {
    id: "phone_number",
    label: "رقم الهاتف",
    shortLabel: "الهاتف",
    sortable: true,
    icon: null,
  },
  {
    id: "birth_year",
    label: "سنة الميلاد",
    shortLabel: "الميلاد",
    sortable: true,
    icon: null,
  },
  {
    id: "createdAt",
    label: "تاريخ التسجيل",
    shortLabel: "التاريخ",
    sortable: true,
    icon: null,
  },
  {
    id: "registrationMethod",
    label: "طريقة التسجيل",
    shortLabel: "الطريقة",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    shortLabel: "الإجراءات",
    sortable: false,
    icon: null,
  },
];

export const MonitorsTableHeaders = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    shortLabel: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "full_name",
    label: "الاسم",
    shortLabel: "الاسم",
    sortable: true,
    icon: User,
  },
  {
    id: "phone_number",
    label: "رقم الهاتف",
    shortLabel: "الهاتف",
    sortable: true,
    icon: null,
  },
  {
    id: "state",
    label: "الحالة",
    shortLabel: "الحالة",
    sortable: true,
    icon: null,
  },
  {
    id: "added_by",
    label: "اضيف بواسطة",
    shortLabel: "المضيف",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    shortLabel: "الإجراءات",
    sortable: false,
    icon: null,
  },
];

export const coordinatorTableHeaders = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    shortLabel: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "full_name",
    label: "الاسم",
    shortLabel: "الاسم",
    sortable: true,
    icon: User,
  },
  {
    id: "phone_number",
    label: "رقم الهاتف",
    shortLabel: "الهاتف",
    sortable: true,
    icon: null,
  },
  {
    id: "numberOfCenters",
    label: "عدد المراكز",
    shortLabel: "المراكز",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    shortLabel: "الإجراءات",
    sortable: false,
    icon: null,
  },
];

export const userTableHeaders = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    shortLabel: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "full_name",
    label: "الاسم",
    shortLabel: "الاسم",
    sortable: true,
    icon: User,
  },
  {
    id: "phone_number",
    label: "رقم الهاتف",
    shortLabel: "الهاتف",
    sortable: true,
    icon: null,
  },
  {
    id: "pollingCenter",
    label: "المركز الانتخابي",
    shortLabel: "المركز",
    sortable: true,
    icon: null,
  },
  {
    id: "role",
    label: "الدور",
    shortLabel: "الدور",
    sortable: true,
    icon: null,
  },
  {
    id: "addBy",
    label: "اضيف بواسطة",
    shortLabel: "المضيف",
    sortable: true,
    icon: null,
  },
  {
    id: "createdAt",
    label: "تاريخ التسجيل",
    shortLabel: "التاريخ",
    sortable: true,
    icon: null,
  },

  {
    id: "actions",
    label: "الإجراءات",
    shortLabel: "الإجراءات",
    sortable: false,
    icon: null,
  },
];

export const governorateTableHeader = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "code",
    label: "الرمز",
    sortable: true,
    icon: null,
  },
  {
    id: "name",
    label: "اسم المحافظة",
    sortable: true,
    icon: User,
  },
  {
    id: "districts_count",
    label: "عدد الاقضية",
    sortable: true,
    icon: User,
  },
  {
    id: "election_centers_count",
    label: "عدد المراكز",
    sortable: true,
    icon: null,
  },
  {
    id: "users_count",
    label: "عدد الناخبين",
    sortable: true,
    icon: null,
  },
  {
    id: "confirmed_voting_users_count",
    label: "عدد المصوتين",
    sortable: true,
    icon: null,
  },
  {
    id: "percentageOfVoters",
    label: "نسبة التصويت",
    sortable: true,
    icon: null,
  },

  {
    id: "actions",
    label: "الإجراءات",
    sortable: false,
    icon: null,
  },
];

export const districtsTableHeader = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "name",
    label: "اسم القضاء",
    sortable: true,
    icon: null,
  },
  {
    id: "governorate",
    label: "المحافظة",
    sortable: true,
    icon: null,
  },
  {
    id: "subdistricts_count",
    label: "عدد النواحي",
    sortable: true,
    icon: null,
  },
  {
    id: "election_centers_count",
    label: "عدد المراكز",
    sortable: true,
    icon: null,
  },

  {
    id: "users_count",
    label: "عدد الناخبين",
    sortable: true,
    icon: null,
  },
  {
    id: "confirmed_voting_users_count",
    label: "عدد المصوتين",
    sortable: true,
    icon: null,
  },
  {
    id: "percentageOfVoters",
    label: "نسبة التصويت",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    sortable: false,
    icon: null,
  },
];
export const subdistrictsTableHeader = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "name",
    label: "اسم الناحية",
    sortable: true,
    icon: null,
  },
  {
    id: "district",
    label: "اسم القضاء",
    sortable: true,
    icon: null,
  },
  {
    id: "governorate",
    label: "المحافظة",
    sortable: true,
    icon: null,
  },

  {
    id: "election_centers_count",
    label: "عدد المراكز",
    sortable: true,
    icon: null,
  },

  {
    id: "users_count",
    label: "عدد الناخبين",
    sortable: true,
    icon: null,
  },
  {
    id: "confirmed_voting_users_count",
    label: "عدد المصوتين",
    sortable: true,
    icon: null,
  },
  {
    id: "percentageOfVoters",
    label: "نسبة التصويت",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    sortable: false,
    icon: null,
  },
];

export const CenterManagersHeader = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "full_name",
    label: "الاسم",
    sortable: true,
    icon: null,
  },
  {
    id: "phone_number",
    label: "رقم الهاتف",
    sortable: true,
    icon: null,
  },

  {
    id: "pollingCenter",
    label: "المركز الانتخابي",
    sortable: true,
    icon: null,
  },

  {
    id: "governorate",
    label: "المحافظة",
    sortable: true,
    icon: null,
  },
  {
    id: "district",
    label: "القضاء",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    sortable: false,
    icon: null,
  },
];

export const DistrictsManagersHeader = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "full_name",
    label: "الاسم",
    sortable: true,
    icon: null,
  },
  {
    id: "phone_number",
    label: "رقم الهاتف",
    sortable: true,
    icon: null,
  },

  {
    id: "governorate",
    label: "المحافظة",
    sortable: true,
    icon: null,
  },
  {
    id: "district",
    label: "القضاء",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    sortable: false,
    icon: null,
  },
];

export const ElectoralStripsHeader = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "ElectionCenter",
    label: "المركز الانتخابي",
    sortable: true,
    icon: null,
  },
  {
    id: "Station",
    label: "المحطة",
    sortable: true,
    icon: null,
  },
  {
    id: "date",
    label: "تاريخ اليوم الانتخابي",
    sortable: true,
    icon: null,
  },
  {
    id: "added_by",
    label: "تم الرفع بواسطة",
    sortable: true,
    icon: null,
  },
  {
    id: "createdAt",
    label: "تاريخ الرفع",
    sortable: true,
    icon: null,
  },
  {
    id: "status",
    label: "الحالة",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    sortable: false,
    icon: null,
  },
];

export const CenterHeader = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "code",
    label: "رمز المركز",
    sortable: true,
    icon: null,
  },
  {
    id: "name",
    label: "اسم المركز",
    sortable: true,
    icon: null,
  },
  {
    id: "governorate",
    label: "المحافظة",
    sortable: true,
    icon: null,
  },
  {
    id: "district",
    label: "اسم القضاء",
    sortable: true,
    icon: null,
  },
  {
    id: "subdistrict",
    label: "اسم الناحية",
    sortable: true,
    icon: null,
  },
  {
    id: "stations_count",
    label: "عدد المحطات",
    sortable: true,
    icon: null,
  },
  {
    id: "users_count",
    label: "عدد الناخبين",
    sortable: true,
    icon: null,
  },
  {
    id: "percentageOfVoters",
    label: "نسبة التصويت",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    sortable: false,
    icon: null,
  },
];
export const StationHeader = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "code",
    label: "رمز المحطة",
    sortable: true,
    icon: null,
  },
  {
    id: "name",
    label: "اسم المحطة",
    sortable: true,
    icon: null,
  },
  {
    id: "tape_count",
    label: "عدد الاشرطة",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    sortable: false,
    icon: null,
  },
];
export const ExpenseHeader = [
  {
    id: "select",
    label: "",
    sortable: false,
    icon: null,
  },
  {
    id: "id",
    label: "ت",
    sortable: true,
    icon: null,
  },
  {
    id: "title",
    label: "العنوان",
    sortable: true,
    icon: null,
  },
  {
    id: "amount",
    label: "الكمية",
    sortable: true,
    icon: null,
  },
  {
    id: "description",
    label: "الوصف",
    sortable: true,
    icon: null,
  },
  {
    id: "actions",
    label: "الإجراءات",
    sortable: false,
    icon: null,
  },
];
