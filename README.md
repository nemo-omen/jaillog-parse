## What's this?
A simple (minimally competent) script for parsing the HTML source of the daily arrest record emails from our local Sheriff's Office and outputting a markdown list of separate charges and the times each charge has occurred.

## But, why?
I got tired of writing out a list of criminal charges every morning.

## Could this be better?
Oh, definitely! This code represents my first-pass attempt at automating a boring and unpleasant task. It could really use some more complete pattern-matching that I haven't figured out how to apply yet. For example, if the booking officer lists one person as being charged with `Failure to Display DL` and another with `Fail to Display Driver License`, this script will list those as totally separate things.

__It's probably better to create an object of all Texas criminal codes, the key being the 8-digit code, and the value being the charge's name.__

## What else could this do?
Because we publish to WordPress, I think it makes sense to output a complete WordPress post (`<!--WP-Paragraph-->`, etc) with everything that needs to be in the post. For now, this just lists all of the charges. As time goes by, I'm sure I'll make it a more complete script.

Also, right now the code will only work on a specifically named html file. This could be improved by making this project into a package and allowing a filename to be passed in as a command-line argument.

## What about a client-side app?
Yep! To make this usable for anyone in the newsroom, the best possible thing would be to make this a client-side script that'll run through any browser with JavaScript enabled.