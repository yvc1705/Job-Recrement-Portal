import { Job } from "../models/job.model.js";
import { ResourceNotFoundError } from "../utils/errors.js";

// admin post krega job
export const postJob = async (req, res, next) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        next(error);
    }
}
// student k liye
export const getAllJobs = async (req, res, next) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs || jobs.length === 0) {
            throw new ResourceNotFoundError("Jobs not found");
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        next(error);
    }
}
// student
export const getJobById = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            throw new ResourceNotFoundError("Job not found");
        }
        return res.status(200).json({ job, success: true });
    } catch (error) {
        next(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res, next) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs || jobs.length === 0) {
            throw new ResourceNotFoundError("Jobs not found");
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        next(error);
    }
}
