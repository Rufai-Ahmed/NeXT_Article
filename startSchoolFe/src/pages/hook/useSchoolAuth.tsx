import useSWR from "swr";
import {
  classAttendance,
  getClassSubjects,
  getClassTimeTable,
  getClassroom,
  getSchoolAnncoement,
  getSchoolClassroom,
  getSchoolCookie,
  getSchoolEvent,
  getSchoolStudentDetail,
  getSchoolStudents,
  readSchool,
  registerSchool,
  studentAttendance,
  topSchoolStudent,
  updateClassroomTeacher,
  viewSchoolByName,
  viewSchoolSubjects,
  viewSchoolTeacher,
} from "../api/schoolAPIs";
import { viewTeacherDetail } from "../../pagesForTeachers/api/teachersAPI";

export const useSchoolRegister = (reader: any) => {
  const { mutate } = useSWR("api/register-school", () => {
    registerSchool(reader);
  });

  return { mutate };
};

export const useSchool = (schoolID: string) => {
  const { data } = useSWR(`api/view-school${schoolID}`, () => {
    readSchool(schoolID);
  });

  return { data };
};

export const useSchoolCookie = () => {
  const { data: dataID } = useSWR(`api/read-school-cookie/`, () => {
    return getSchoolCookie().then((res) => {
      return res.data;
    });
  });
  return { dataID };
};

export const useSchoolData = () => {
  const { dataID } = useSchoolCookie();

  const { data, isLoading } = useSWR(`api/view-school/${dataID}`, () => {
    return readSchool(dataID!).then((res) => {
      return res.data;
    });
  });
  return { data, isLoading };
};

export const useSchoolDataByName = (schoolName: string) => {
  const { data: schoolInfo } = useSWR(`api/view-school/${schoolName}`, () => {
    return viewSchoolByName(schoolName!).then((res) => {
      return res.data;
    });
  });
  return { schoolInfo };
};

export const useSchoolClassRM = () => {
  const { dataID } = useSchoolCookie();
  const { data: schoolClassroom } = useSWR(
    `api/view-classrooms/${dataID}`,
    () => {
      return getSchoolClassroom(dataID!).then((res) => {
        return res.data;
      });
    }
  );
  return { schoolClassroom };
};

export const useSchoolClassRMTeacherUpdate = (classID: string, data: {}) => {
  const { dataID } = useSchoolCookie();
  const { data: schoolClassroom } = useSWR(
    `api/update-classrooms-teacher/${dataID}/${classID}`,
    () => {
      return updateClassroomTeacher(dataID!, classID, data).then((res) => {
        return res.data;
      });
    }
  );
  return { schoolClassroom };
};

export const useSchoolClassRMDetail = (classID: string) => {
  const { data: classroom } = useSWR(`api/view-classrooms/${classID}`, () => {
    return getClassroom(classID!).then((res) => {
      return res.data;
    });
  });
  return { classroom };
};

export const useSchoolAnnouncement = () => {
  const { dataID } = useSchoolCookie();
  const { data: schoolAnnouncement } = useSWR(
    `api/view-announcement/${dataID}`,
    () => {
      return getSchoolAnncoement(dataID!).then((res) => {
        return res.data;
      });
    }
  );
  return { schoolAnnouncement };
};

export const useSchoolEvent = () => {
  const { dataID } = useSchoolCookie();
  const { data: schoolEvent } = useSWR(`api/view-event/${dataID}`, () => {
    return getSchoolEvent(dataID!).then((res) => {
      return res.data;
    });
  });
  return { schoolEvent };
};

export const useSchoolTeacher = () => {
  const { dataID } = useSchoolCookie();

  const { data: schoolTeacher } = useSWR(
    `api/view-school-teacher/${dataID}`,
    () => {
      return viewSchoolTeacher(dataID!).then((res) => {
        return res.data;
      });
    }
    // { refreshInterval: 5000 }
  );
  return { schoolTeacher };
};

export const useSchoolSubject = () => {
  const { dataID } = useSchoolCookie();

  const { data: schoolSubject } = useSWR(
    `api/view-school-subject/${dataID}`,
    () => {
      return viewSchoolSubjects(dataID!).then((res) => {
        return res.data;
      });
    }
  );
  return { schoolSubject };
};

export const useSchoolTeacherDetail = (teacherID: string) => {
  const { data: schoolSubjectTeacherDetail } = useSWR(
    `api/view-school-subject-teacher/${teacherID}`,
    () => {
      return viewTeacherDetail(teacherID!).then((res: any) => {
        return res.data;
      });
    }
  );
  return { schoolSubjectTeacherDetail };
};

export const useClassSubjects = (classID: string) => {
  const { data: readSubject } = useSWR(`api/view-class-info/${classID}`, () => {
    return getClassSubjects(classID!).then((res) => {
      return res?.data?.classSubjects;
    });
  });

  return { readSubject };
};

export const useClassTimeTable = (classID: string) => {
  const { data: timetbale } = useSWR(
    `api/view-time-table/${classID}`,
    () => {
      return getClassTimeTable(classID!).then((res) => {
        return res;
      });
    },
    { refreshInterval: 10000 }
  );

  return { timetbale };
};

export const useSchoolStudents = (schoolID: string) => {
  const { data: students } = useSWR(
    `api/read-student/${schoolID}`,
    () => {
      return getSchoolStudents(schoolID!).then((res) => {
        return res;
      });
    },
    { refreshInterval: 10000 }
  );

  return { students };
};

export const useSchoolStudentDetail = (studentID: string) => {
  const { data: studentDetails } = useSWR(
    `api/read-student-info/${studentID}`,
    () => {
      return getSchoolStudentDetail(studentID!).then((res) => {
        return res;
      });
    },
    { refreshInterval: 10000 }
  );

  return { studentDetails };
};

export const useTopSchoolStudent = (studentID: string) => {
  const { data: perform } = useSWR(
    `api/view-school-top-student/${studentID}`,
    () => {
      return topSchoolStudent(studentID!).then((res) => {
        return res;
      });
    },
    { refreshInterval: 10000 }
  );

  return { perform };
};

export const useClassAttendance = (classID: string) => {
  const { data: mainAttendance } = useSWR(
    `api/view-class-attendance/${classID}`,
    () => {
      return classAttendance(classID!).then((res) => {
        return res;
      });
    }
  );

  return { mainAttendance };
};

export const useStudentAttendance = (studentID: string) => {
  const { data: mainStudentAttendance } = useSWR(
    `api/view-student-attendance/${studentID}`,
    () => {
      return studentAttendance(studentID!).then((res) => {
        return res;
      });
    }
  );

  return { mainStudentAttendance };
};
