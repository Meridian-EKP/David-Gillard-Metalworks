# Stripe setup for David (plain English)

Stripe takes the card payments for the folding machine. There is no monthly fee, only a small fee on each sale
(check the current UK rate on stripe.com/gb/pricing). The money is paid into David's bank account.
The website never handles card details: the "Buy now" button just sends the customer to Stripe's secure page.

## Part 1: David creates his account (about 15 minutes, he must do this himself)
1. Go to stripe.com/gb and click **Start now**. Use dagmetals8@gmail.com and a new password.
2. Confirm the email Stripe sends.
3. Stripe asks for business details: sole trader is fine. It will ask for his name, date of birth, home address, and bank account (to be paid into) and some ID. Have a bank card or statement and photo ID to hand.
4. Wait for Stripe to say payments are active.

## Part 2: create the "Buy now" link (about 5 minutes; Ed can do this on a call)
1. In Stripe go to **Payment links** and click **New**.
2. **Product:** "Metal Folding Hand Machine 600mm", price **£133**, one time. Add the first photo.
3. Turn on **Let customers adjust quantity**.
4. Turn on **Collect customers' addresses** (shipping).
5. Add **shipping options**: "Courier, 3 to 5 days" £9.95, and "Collect from Littlehampton" £0 (optional).
6. **After payment:** choose "Don't show confirmation page", redirect to `https://YOUR-WEBSITE/thanks.html` (use the real address once the site is live).
7. Click **Create link**, then copy it. It starts with `https://buy.stripe.com/`.

## Part 3: connect it to the website (Ed)
In `index.html`, find the Buy now button (`id="buy"`) and paste the link between the quotes of `data-stripe=""`.
Make a test purchase first using Stripe **test mode** (switch on "Test mode" in Stripe, create the link there, use card 4242 4242 4242 4242), then repeat Part 2 in live mode and paste the live link.

## Each order
Stripe emails David for every sale with the customer's name and address. He posts the machine. Done.
