import { useEffect, useState } from "react";
import { getSchoolCookie, readSchool } from "../pages/api/schoolAPIs";
import { RouterProvider } from "react-router-dom";
import { adminRouter } from "./adminRouter";
import { mainRouter } from "./mainRouter";
import { teacherRouter } from "./teacherRouter";
import { studentRouter } from "./studentRouter";
import {
  readTeacherCookie,
  viewTeacherDetail,
} from "../pagesForTeachers/api/teachersAPI";
import { useSelector } from "react-redux";
import {
  readStudentCookie,
  viewStduentDetail,
} from "../pagesForStudents/api/studentAPI";

const RouterScreen = () => {
  const userStatus = useSelector((state: any) => state.userStatus);

  const [state, setState] = useState<any>({} || "" || 0);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (userStatus === "school-admin") {
        getSchoolCookie().then((res: any) => {
          return readSchool(res.data).then((resp) => {
            if (resp.status === 200) {
              return setState(resp.data);
            } else if (resp?.response?.status === 404) {
              return setState(resp?.response?.status);
            }
          });
        });
      } else if (userStatus === "school-teacher") {
        readTeacherCookie().then((res: any) => {
          return viewTeacherDetail(res.data).then((resp: any) => {
            if (resp.status === 200) {
              return setState(resp.data);
            } else if (resp?.response?.status === 404) {
              return setState(resp?.response?.status);
            }
          });
        });
      } else if (userStatus === "school-student") {
        readStudentCookie().then((res: any) => {
          console.log(res);
          return viewStduentDetail(res.data).then((resp: any) => {
            if (resp.status === 200) {
              return setState(resp.data);
            } else if (resp?.response?.status === 404) {
              return setState(resp?.response?.status);
            }
          });
        });
      }

      clearTimeout(timer);
    });

    const timing = setTimeout(() => {
      if (!state.status) {
        setLoadingState(true);
      }
      clearTimeout(timing);
    }, 200);
  }, []);

  return (
    <div>
      {state?.status === "school-admin" ? (
        <div>
          <RouterProvider router={adminRouter} />
        </div>
      ) : state?.status === "school-teacher" ? (
        <div>
          <RouterProvider router={teacherRouter} />
        </div>
      ) : state?.status === "school-student" ? (
        <div>
          <RouterProvider router={studentRouter} />
        </div>
      ) : (
        <div>
          {loadingState && (
            <div>
              {!state?.status && <RouterProvider router={mainRouter} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RouterScreen;
