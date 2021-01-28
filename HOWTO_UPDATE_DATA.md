This is a document for internal team members who can help update the latest statistics and county news data. It's easy! Anyone can update the statistic data on this GitHub repository site only.

As a starting point,check [Pull requests](https://github.com/sfbrigade/stop-covid19-sfbayarea/pulls) to see if there is any new data update request.

There are 4 types of Pull requests. Please follow the steps below for each.

## GitHub action: data update

This is the cases/death data we call as v1, which the filename is data/data.json scraped from CDS(Corona Data Scraper). 

1. Click "Details" on the "deploy/netlify" to review the preview site with the latest data.
 ![data1-preview](https://user-images.githubusercontent.com/61864097/106182447-aa2a2280-6153-11eb-91b5-03872a4a4043.png)

1. On the preview site, review all the cases and death number sounds right. If nothing specific strange value shown up, it should be good. You can review the chart by clicking "DAILY", "TOTAL", and "Last XX days" to see the chart works fine.
 ![data1-review1](https://user-images.githubusercontent.com/61864097/106182455-ad251300-6153-11eb-93e3-0f7eedbcab24.png)

1. School down to the county selection, try different counties (if possible, all 9 counties) to review each chart reflects properly.
 ![data1-review2](https://user-images.githubusercontent.com/61864097/106182462-aeeed680-6153-11eb-8608-5a5ac74bc114.png)

1. Go back to the Pull Request page, click the tab "Files changed", then add your review by clicking "Review changes". You can add any comments about your review result, then check "Approve" and click "Submit review".
 ![data1-review3](https://user-images.githubusercontent.com/61864097/106183222-d003f700-6154-11eb-90b0-f30d8e41139d.png)

1. You will see all GREEN lights on the pull request page as well as the button "Merge pull request", go push the button to complete the merge.
 ![data1-merge1](https://user-images.githubusercontent.com/61864097/106183229-d2fee780-6154-11eb-80d7-ce0822f3e384.png)
 ![data1-merge2](https://user-images.githubusercontent.com/61864097/106183238-d5f9d800-6154-11eb-9775-255f63ea8ddc.png)
 ![data1-merge3](https://user-images.githubusercontent.com/61864097/106183253-d98d5f00-6154-11eb-8a20-119eb426ab51.png)


Hooray! You done the update for statistics data! As a note, you do not need to delete branch for it as it will be used for the next update every time.


## GitHub action: data v2 update

This is the age/race/ethnicity/gender data we call as v2, which the filename is data/data.v2.json scraped from the Bay Area counties publlic helth department web site.

TO BE UPDATED with screen shots.

## GitHub action: hospitalization data update

This is the ICU bed availability data, which the filename is data/data_hospitalization.json scraped from data.ca.gov.

TO BE UPDATED with screen shots.

## GitHub action: news update

This is the for News & Updates in the County Info page, which the filename is data/news/COUNTYNAME.json(and .rss) scraped from the Bay Area counties official web site.

TO BE UPDATED with screen shots.
