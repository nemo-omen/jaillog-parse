## What's this?
A simple (minimally competent) script for parsing the HTML source of the daily arrest record emails from our local Sheriff's Office and outputting a markdown list of separate charges and the times each charge has occurred.

## But, why?
I got tired of writing out a list of criminal charges every morning.

## Could this be better?
Oh, definitely! This code represents my first-pass attempt at automating a boring and unpleasant task. It could really use some more complete pattern-matching that I haven't figured out how to apply yet. For example, if the booking officer lists one person as being charged with `Failure to Display DL` and another with `Fail to Display Driver License`, this script will list those as totally separate things.