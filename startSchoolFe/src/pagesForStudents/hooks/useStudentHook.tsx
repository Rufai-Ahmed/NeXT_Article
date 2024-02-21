import useSWR from "swr";
import {
  classAssignment,
  getOneArticle,
  getSchoolArticle,
  readStudentCookie,
  viewStduentDetail,
  viewStudentAttendance,
} from "../api/studentAPI";

export const useStudentCookie = () => {
  const { data: dataID } = useSWR(`api/read-student-cookie/`, () => {
    return readStudentCookie().then((res: any) => {
      return res.data;
    });
  });
  return { dataID };
};

export const useStudentInfo = () => {
  const { dataID } = useStudentCookie();

  const { data: studentInfo } = useSWR(
    `api/view-student-info/${dataID}`,
    () => {
      return viewStduentDetail(dataID!).then((res: any) => {
        return res.data;
      });
    }
  );
  return { studentInfo };
};

export const useStudentAttendant = (studentID: string) => {
  const { data: studentAttendance } = useSWR(
    `api/viewing-student-attendance/${studentID}`,
    () => {
      return viewStudentAttendance(studentID!).then((res: any) => {
        return res.data;
      });
    }
  );
  return { studentAttendance };
};

export const useAssignment = (classID: string) => {
  const { data: classAssignments } = useSWR(
    `api/viewing-class-assignment/${classID}`,
    () => {
      return classAssignment(classID!).then((res: any) => {
        return res.data;
      });
    }
  );
  return { classAssignments };
};

export const useOneArticle = (studentID: string) => {
  const { data: oneArticle } = useSWR(
    `api/viewing-one-article/${studentID}`,
    () => {
      return getOneArticle(studentID!).then((res: any) => {
        return res.data;
      });
    }
  );
  return { oneArticle };
};

export const useSchoolArticle = (schoolID: string) => {
  const { data: allArticle } = useSWR(
    `api/viewing-all-article/${schoolID}`,
    () => {
      return getSchoolArticle(schoolID!).then((res: any) => {
        return res.data;
      });
    }
  );
  return { allArticle };
};
