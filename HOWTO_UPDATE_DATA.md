This is a document for internal team members who can help update the latest statistics and county news data. It's easy! Anyone can update the statistic data on this GitHub repository site only.

As a starting point,check [Pull requests](https://github.com/sfbrigade/stop-covid19-sfbayarea/pulls) to see if there is any new data update request.

There are 4 types of Pull requests. Please follow the steps below for each.

## GitHub action: data update

This is the cases/death data we call as v1, which the filename is data/data.json scraped from CDS(Corona Data Scraper). 

1. Click "Details" on the "deploy/netlify" to review the preview site with the latest data.

1. On the preview site, review all the cases and death number sounds right. If nothing specific strange value shown up, it should be good. You can review the chart by clicking "DAILY", "TOTAL", and "Last XX days" to see the chart works fine.

1. School down to the county selection, try different counties (if possible, all 9 counties) to review each chart reflects properly.



## GitHub action: data v2 update

This is the age/race/ethnicity/gender data we call as v2, which the filename is data/data.v2.json scraped from the Bay Area counties publlic helth department web site.

TO BE UPDATED with screen shots.

## GitHub action: hospitalization data update

This is the ICU bed availability data, which the filename is data/data_hospitalization.json scraped from data.ca.gov.

TO BE UPDATED with screen shots.

## GitHub action: news update

This is the for News & Updates in the County Info page, which the filename is data/news/COUNTYNAME.json(and .rss) scraped from the Bay Area counties official web site.

TO BE UPDATED with screen shots.
