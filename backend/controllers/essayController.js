import Essay from '../models/essayModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get logged in user essays
// @route   GET /api/essays
// @access  Private
const getEssays = asyncHandler(async (req, res) => {
    const essays = await Essay.find({ user: req.user._id });
    res.json(essays);
})

//@description     Fetch single Essay
//@route           GET /api/essays/:id
//@access          Public
const getEssayById = asyncHandler(async (req, res) => {
    const essay = await Essay.findById(req.params.id);

    if (essay) {
        res.json(essay);
    } else {
        res.status(404).json({ message: "Essay not found" });
    }

    res.json(essay);
});

//@description     Create single Essay
//@route           GET /api/essays/create
//@access          Private
const CreateEssay = asyncHandler(async (req, res) => {
    const { heading, essaybody } = req.body;

    if (!heading || !essaybody) {
        res.status(400);
        throw new Error("Please enter all essay details");
        return;
    } else {
        const essay = new Essay({ user: req.user._id, heading, essaybody });

        const createdEssay = await essay.save();

        res.status(201).json(createdEssay);
    }
});

//@desc    Update essay
//@route   PUT /api/essays/:id
//@access  Private
const UpdateEssay = asyncHandler(async (req, res) => {
    const { heading, essaybody } = req.body;

    const essay = await Essay.findById(req.params.id);

    if (essay.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (essay) {
        essay.heading = heading;
        essay.essay = essay;

        const updatedEssay = await essay.save();
        res.json(updatedEssay);
    } else {
        res.status(404);
        throw new Error('Essay not found');
    }
});

//@description     Delete single Essay
//@route           GET /api/essays/:id
//@access          Private
const DeleteEssay = asyncHandler(async (req, res) => {
    const essay = await Essay.findById(req.params.id);

    if (essay.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (essay) {
        await essay.remove();
        res.json({ message: "Essay Removed" });
    } else {
        res.status(404);
        throw new Error('Essay not found');
    }
});

export { getEssays, getEssayById, CreateEssay, UpdateEssay, DeleteEssay };
