const { Router } = require("express");
const { register, addImageToEvent } = require("../controllers/Registration");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const router = Router();

const stripe = require("stripe")("sk_test_51Pu6ToP341NfhX74F4JkJxKITDNgwlhUp16L5IoUo6z38zFZI97DKJAUFzMvr5AR50Bfw4GRCl8AdomHtfVyz33m00a7hQ62xo")

router.post("/create-checkout-session", async (req, res) => {
    try {
        const { amount } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Your Product Name',
                        },
                        unit_amount: amount, // Use the amount from the frontend
                    },
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/fail"
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).send("Internal Server Error");
    }
});



router.post("/registerEvent", register);
router.post("/addImageToEvent",addImageToEvent);

module.exports = router;