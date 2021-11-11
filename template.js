/**
 * 
 * @param {*} timePeriod hours
 * @param {*} rosterCount number of listings in rosterCount
 * @param {*} permalink permalink to final article (better set it up before running this!)
 * @param {*} list list of charges with charge counts for
 * @param {*} rosterHTML html of roster
 * @returns 
 */
export function wpTemplate(timePeriod, rosterCount, permalink, list, rosterHTML) {
  return `<!-- wp:paragraph -->
<p>Over the past ${timePeriod} hours, ${rosterCount} people were booked into the Tom Green County Detention Center. Below is a summary of the booking charges and the individual Tom Green County Detention Center records.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Charge categories</strong> <em>(Note: several that have been taken into custody have multiple charges filed against them&nbsp;that&nbsp;fit into more than one general category. See the individual records for details)</em></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
// loop through charges list & output li elements
${list.map((item) => `<li>${item}</li>`)}
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><a href="${permalink}">[NOTE: If viewing on the news app, please click here to view the roster.]</a></p>
<!-- /wp:paragraph -->

<!-- wp:html -->
${rosterHTML}
<!-- /wp:html -->

<!-- wp:paragraph -->
<p><em><strong>Disclaimer</strong>: Information presented on this website is collected, maintained, and provided for the convenience of the site visitor/reader. While every effort is made to keep such information accurate and up-to-date, the Tom Green County Detention Center can not certify the accuracy and/or authenticity of any information. The reader should not rely on this information in any manner. Under no circumstances shall Tom Green County, the Sheriff of Tom Green County, the web development supplier for Tom Green County Sheriff, the employees of Tom Green County nor the employees of Tom Green County Detention Center be liable for any decisions, actions taken or omissions made from reliance on any information contained herein from whatever source, nor shall the Tom Green County Detention Center be liable for any other consequences from any such reliance. *Booking and release times are approximate. These records are from the Tom Green County Jail system.</em><br><strong>Source:</strong> Tom Green County Sheriff's Office<br><strong>Contact information</strong><br><strong>Address</strong>: 122 W Harris Ave, San Angelo, TX 76903<br><strong>Phone:</strong> (325) 659-6597</p>
<!-- /wp:paragraph -->
`;
}