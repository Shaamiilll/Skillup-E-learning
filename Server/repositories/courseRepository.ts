import Courses from "../models/courseModel"
import Icourse from "../interfaces/course"

class courseRepository{
    async createCourse(details:Icourse){
        try {
          // console.log(details);
          
            const course = await Courses.create(details);
            if (!course) {
              return {
                success: false,
                message: `server error`,
              };
            }
            console.log(course);
            
            return {
              success: true,
              message: "Course created",
              data: course,
            };
        } catch (error) {
          return {
            success: false,
            message: `Failed to fetch ${error}`,
          };
        }
    }
    async getCourses(regex: string) {
        try {
          const courses = regex
            ? await Courses.find({ title: { $regex: regex, $options: "i" } })
                // .populate("instructor", "name")
                // .populate("category", "name")
                // .populate("reviews.user", "name")
                // .sort({ _id: -1 })
            : await Courses.find()
                // .populate("instructor", "name")
                // .populate("category", "name")
                // .populate("reviews.user", "name")
                // .sort({ _id: -1 });
            
             
              
          return {
            success: true,
            message: "Fetch all caetgories",
            courses,
          };
        } catch (error) {
          return {
            success: false,
            message: `Failed to fetch ${error}`,
          };
        }
      }
}

export default courseRepository