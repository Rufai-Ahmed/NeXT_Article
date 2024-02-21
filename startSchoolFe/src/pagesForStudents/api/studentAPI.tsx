import axios from "axios";

const URL: string = "http://localhost:2244/api";

export const viewStduentDetail: any = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/read-student-info/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginStudent = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/login-student/`, data, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readClassInfo = async (className: string) => {
  try {
    return await axios
      .post(`${URL}/view-classroom-info-name/`, { className })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const performanceTest = async (
  studentID: string,
  quizID: string,
  data: {}
) => {
  try {
    return await axios
      .post(
        `${URL}/create-subject-quiz-performance/${studentID}/${quizID}/`,
        data
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readStudentCookie = async () => {
  try {
    return await axios
      .get(`${URL}/read-student-cookie/`, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewStudentAttendance = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/viewing-student-attendance/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const classAssignment = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-class-assignment/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createStudentArticle = async (
  schoolID: string,
  studentID: string,
  data: {}
) => {
  try {
    return await axios
      .post(`${URL}/create-article/${schoolID}/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};

export const getOneArticle = async (articleID: string) => {
  try {
    return await axios
      .get(`${URL}/view-article/${articleID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolArticle = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-article/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};
