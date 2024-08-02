const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
	try {
		const data = req.body;

		const newMenuItem = new MenuItem(data);

		const response = await newMenuItem.save();
		console.log("data saved");
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {
	try {
		const data = await MenuItem.find();
		console.log("data fetched");
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/:taste", async (req, res) => {
	try {
		const taste = req.params.taste;
		if (taste == "sweet" || taste == "spicy" || taste == "sour") {
			const response = await MenuItem.find({ taste });
			console.log("data fetched");
			res.status(200).json(response);
		} else {
			res.status(404).json({ error: "Invalid tasteType" });
		}
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const menuItemId = req.params.id;
		const updateMenuItemData = req.body;

		const response = await MenuItem.findByIdAndUpdate(
			menuItemId,
			updateMenuItemData,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!response) {
			return res.status(404).json({ error: "menu item not found" });
		}

		console.log("data updated");
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const menuItemId = req.params.id;

		const response = await MenuItem.findByIdAndDelete(menuItemId);

		if (!response) {
			return res.status(404).json({ error: "menu item not found" });
		}

		console.log("data deleted");
		res.status(200).json({ message: "menu item deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
