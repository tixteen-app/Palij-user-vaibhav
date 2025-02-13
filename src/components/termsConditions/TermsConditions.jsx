import { Link } from "react-router-dom"
import { assets } from "../../assets/assets"
import "./termsConditions.css"
import { GoDotFill } from "react-icons/go"

const termsConditions = () => {
	const data = [
		{
			title: 'Introduction',
			points: [
				'For the purpose of these Terms and Conditions, the term "we", "us", "our" used anywhere on this page shall mean PALJI BAKERY, whose registered/operational office is 5A, Sat Paul Mittal Rd. A- Block, Sarabha Nagar Ludhiana PUNJAB 141001.',
				'The term "you", “your”, "user", “visitor” shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.',
				'Your use of the website and/or purchase from us are governed by the following Terms and Conditions.',
			]
		},
		{
			title: 'Website Content',
			points: [
				'The content of the pages of this website is subject to change without notice.',
				'Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.',
				'You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.',
				'Your use of any information or materials on our website and/or product pages is entirely at your own risk.',
				'It shall be your own responsibility to ensure that any products, services, or information available through our website and/or product pages meet your specific requirements.',
			]
		},
		{
			title: 'Intellectual Property',
			points: [
				'Our website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics.',
				'Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.',
				'All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.',
				'Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.',
			]
		},
		{
			title: 'Links to Third-Party Websites',
			points: [
				'From time to time, our website may include links to other websites.',
				'These links are provided for your convenience to provide further information.',
				'You may not create a link to our website from another website or document without PALJI BAKERY’s prior written consent.',
			]
		},
		{
			title: 'Dispute Resolution',
			points: [
				'Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.',
			]
		},
		{
			title: 'Liability Disclaimer',
			points: [
				'We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any transaction.',
				'This may occur due to the cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.',
			]
		}
	];

	return (
		<>

			<div className="main_term_and_condition_div" >
				<div className="top_term_and_condition_div" >
					<div className="term_and_condition_div" >TERMS & <br /> CONDITIONS</div>
				</div>
				<div className="bottom_term_and_condition_div" >
					{data.map((section, index) => (
						<div key={index} className="term_and_condition_div_bottom_data">
							<h2>{section.title}</h2>
							<ul>
								{section.points.map((point, idx) => (
									<li key={idx}>{point}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default termsConditions
