I&#8217;m playing around with my voting control and I was thinking of (in addition to a cookie based check)&nbsp;querying to see how recently this IP address had tried voting and if it was within &#8216;x&#8217; seconds, rejecting the vote&#8230; 

Something more extreme, like rejecting any second vote from the same IP seems wrong, since multiple people could be coming in through the same IP.. in fact, you have to assume that is likely over time&#8230;

What do you folks think? Is a time-limit per IP address reasonable, or will that produce &#8216;odd&#8217; behaviour for corporate and large ISP users?