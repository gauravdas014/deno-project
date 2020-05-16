import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// FILE: model

interface Course {
    name: String;
    price: number;
    certification: boolean;
}

// File: data

let courses: Array<Course> = [
    {
        name: "C++ Bootcamp",
        price: 2.4,
        certification: true,
    },
    {
        name: "MERN Bootcamp",
        price: 2,
        certification: true,
    },
    {
        name: "React Bootcamp",
        price: 2.4,
        certification: true,
    },
    {
        name: "iOS 13 Crash course",
        price: 0,
        certification: false,
    },
];

//FILE: Controllers

export const getCourses = ({ response }: { response: any }) => {
    response.body = courses;
};

export const addCourses = async ({
    request,
    response,
}: {
    request: any;
    response: any;
}) => {
    const body = await request.body();
    const course: Course = body.value;

    courses.push(course);
    response.body = { coursesAdded: "SUCCESS" };
    response.status = 200;
};

// FILE: server files

const router = new Router();
const app = new Application();
const PORT = 4300;

router.get("/learn", getCourses).post("/create", addCourses);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 4300 });
