import React from "react";
import style from "../assets/css/homePageStyle.module.css";

/*
Created by Joel Tierney
React Component containing StuBank homepage.
*/
export class Home extends React.Component {
    render() {
        return (
            <div>
                <div className={style.home}>
                    <h1>Welcome to StuBank!</h1>
                    <p>We are a brand new banking group made specifically for students,
                        launching in <strong>February 2021. </strong><br/><br/>
                        We are extremely excited to welcome you to the StuBank website and hope
                        you choose us to be your next student banking provider.<br/>
                        If you're not sure where to start, we encourage you to check out our FAQ page!</p>
                </div>
                <div className={style.home}>
                    <h1>Top Money-Saving Tips</h1>
                    <p>
                        1. It's important to <strong>keep track of your spending</strong>. Create a spreadsheet of your
                        finances so you can see how much you have to spend each month. Include your income from student
                        loans, scholarships and bursaries, any parental contributions and part-time jobs, as well as
                        regular outgoings such as your rent and mobile phone.
                        <br/><br/>
                        2. You'll need to <strong>be smart with food shopping</strong>. Do a cost-effective 'big shop'
                        at the start of each week and minimise the number of takeaways you have. Buy supermarket value
                        products rather than well-known brands, and shop at the end of the day when many items are
                        discounted. Share the cooking with your housemates and plan your daily meals in advance. You'll
                        save money by making packed lunches rather than buying a sandwich or going to a coffee shop.
                        <br/><br/>
                        3. <strong>Don't overpay for transport</strong>. Most universities are either city-based with
                        excellent public transport links, or campus-based with everything on your doorstep. You probably
                        won't need a car while studying. Instead <strong>take advantage of student discounts</strong> on
                        travel.
                        <br/><br/>
                        4. If you take the train regularly, a 16-25 railcard will pay for itself. Costing £30 for one
                        year or £70 for three, this will give you a third off all rail fares and will save you around
                        £199 per year. Mature students can download the digital-only 26-30 railcard, costing £30 per
                        year while also offering a third off fares, saving you around £125 a year.
                        <br/><br/>
                        5. Local buses remain one of the cheapest ways to get around. Check whether you're entitled to
                        any student discounts or weekly/monthly passes on the services you use.
                        <br/><br/>
                        6. You can benefit from more than 200 student discounts ranging from essentials to fashion,
                        music and technology if you <strong>sign up for TOTUM membership</strong>. This can be enjoyed
                        for free with TOTUM Lite or starts from £14.99 for 12 months if you're looking to take advantage
                        of the full range of offers. Savings include 10% off at the Co-op and ASOS and 20% off at Pizza
                        Hut. View the full list at TOTUM!
                        <br/><br/>
                        7. Once you know your reading list for the academic year, <strong>buy your course books
                        second-hand wherever possible</strong>. You won't need to buy them all and can borrow set texts
                        from the library. You'll find cheap second-hand copies online or through your university and can
                        sell the books when they're no longer required.
                        <br/><br/>
                        8. If you're sharing a student house, you'll be responsible for your gas, electricity, water and
                        Wi-Fi costs. Use comparison websites to get the best deals and keep costs down by saving energy.
                        Set up direct debits for regular bills, so they're paid automatically each month. This will help
                        you to avoid any late payment charges.
                        <br/><br/>
                        9. Sharing bills among housemates can be effective if this is managed carefully. Make sure
                        people are paid back as quickly as possible. This will avoid any unnecessary tension should
                        anybody consistently fail to pay their share. Read more about living in student accommodation on
                        the Prospects website.
                    </p>
                    <p>Source:
                        https://www.prospects.ac.uk/applying-for-university/university-life/saving-money-as-a-student
                    </p>
                </div>
            </div>
        );
    }
}
