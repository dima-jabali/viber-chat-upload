export function LoanAgreement() {
	return (
		<div className="bg-white text-gray-900 p-8 md:p-12">
			<title>Loan Agreement</title>

			<div className="max-w-4xl mx-auto border border-gray-300 p-8 md:p-12">
				<header className="text-center pb-6 border-b border-gray-300">
					<h1 className="text-3xl font-bold uppercase">Loan Agreement</h1>
					<h2 className="text-xl mt-2">
						This document is a legally binding contract.
					</h2>
				</header>

				<section className="mt-8 space-y-4 text-justify text-base leading-relaxed">
					<p>
						This Loan Agreement (the "Agreement") is made this{" "}
						<span className="font-semibold">12th day of August, 2025</span>, by
						and between{" "}
						<span className="font-bold">
							The Philippine Bank of Communications
						</span>
						, located at Makati City, Philippines (hereinafter referred to as
						the "Lender") and <span className="font-bold">Juan Dela Cruz</span>,
						residing at 123 Mabini St., Manila, Philippines (hereinafter
						referred to as the "Borrower").
					</p>

					<p>
						<strong>WITNESSETH:</strong>
					</p>
					<p>
						WHEREAS, the Borrower desires to obtain a loan from the Lender, and
						the Lender is willing to provide a loan to the Borrower on the terms
						and conditions set forth herein;
					</p>
					<p>
						NOW, THEREFORE, in consideration of the mutual covenants contained
						in this Agreement, the parties hereto agree as follows:
					</p>
				</section>

				<section className="mt-8 space-y-4">
					<h3 className="text-xl font-bold uppercase">
						Article I: Terms of Loan
					</h3>
					<p className="text-base leading-relaxed">
						<strong>1.1. Principal Amount.</strong> The Lender agrees to lend
						the Borrower the principal sum of <strong>₱50,000.00</strong> (Fifty
						Thousand Philippine Pesos).
					</p>
					<p className="text-base leading-relaxed">
						<strong>1.2. Interest Rate.</strong> The loan shall bear interest at
						a fixed rate of <strong>1.5%</strong> per month.
					</p>
					<p className="text-base leading-relaxed">
						<strong>1.3. Repayment Period.</strong> The loan shall be fully
						repaid within <strong>12</strong> months from the effective date of
						this Agreement.
					</p>
					<p className="text-base leading-relaxed">
						<strong>1.4. Monthly Payment.</strong> The Borrower shall repay the
						loan in equal monthly installments of <strong>₱4,584.00</strong>,
						with the first payment due on <strong>September 12, 2025</strong>.
					</p>
					<p className="text-base leading-relaxed">
						<strong>1.5. Total Amount to Pay.</strong> The total amount to be
						paid by the Borrower, including interest, is{" "}
						<strong>₱55,008.00</strong>.
					</p>
					<p className="text-base leading-relaxed">
						<strong>1.6. Late Payment.</strong> Any payment not received within
						15 days of its due date shall incur a late fee equal to{" "}
						<strong>5%</strong> of the outstanding payment.
					</p>
				</section>

				<section className="mt-8 space-y-4">
					<h3 className="text-xl font-bold uppercase">
						Article II: General Provisions
					</h3>
					<p className="text-base leading-relaxed">
						<strong>2.1. Governing Law.</strong> This Agreement shall be
						governed by and construed in accordance with the laws of the
						Republic of the Philippines.
					</p>
					<p className="text-base leading-relaxed">
						<strong>2.2. Entire Agreement.</strong> This Agreement constitutes
						the entire agreement between the parties and supersedes any prior
						understanding or representation of any kind preceding the date of
						this Agreement.
					</p>
				</section>

				<section className="mt-12 pt-8 border-t border-gray-300">
					<h3 className="text-xl font-bold uppercase mb-8">
						IN WITNESS WHEREOF
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16">
						<div className="space-y-6">
							<div className="border-b-2 border-gray-400 h-10"></div>

							<p className="font-semibold text-sm">
								Signature of Lender (The Philippine Bank of Communications)
							</p>
						</div>

						<div className="space-y-6">
							<div className="border-b-2 border-gray-400 h-10"></div>

							<p className="font-semibold text-sm">
								Signature of Borrower (Juan Dela Cruz)
							</p>
						</div>
					</div>
				</section>

				<footer className="mt-12 text-center text-xs text-gray-500">
					<p>Document created on August 12, 2025.</p>
				</footer>
			</div>
		</div>
	);
}
