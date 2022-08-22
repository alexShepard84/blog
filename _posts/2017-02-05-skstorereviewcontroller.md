---
layout:     post
title:      "App Store Ratings: How to use SKStoreReviewController"
date:       2017-02-05
summary:	"Since iOS 10.3 Apple offers us the possibility to leave user reviews directly out of the app. Sounds great, but there is a small hook here.
The dialog can only be opened three times a year, no matter how many app updates you have published.<br /> 
In this post I describe an approach how to handle SKStoreReviewController"
categories: ios
comments: true
---

Welcome to my first blog post :)
# Overview
Since iOS 10.3 Apple offers us the possibility to leave user reviews directly out of the app. Sounds great, but there is a small hook here.
The dialog can only be opened three times a year, no matter how many app updates you have published.
Baaam! Okay, you have to let that sink in now. But you will remember the time when apps asked for user ratings through dialogs.
Apple writes in their [Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/system-capabilities/ratings-and-reviews/):

> Don't be a pest. Repeated rating prompts can be irritating, and may even negatively influence the user's opinion of your app. 

In addition, according to the[App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/) apps rejected, if a custom dialog is used.

> 1.1.7 App Store Reviews:
> Use the provided API to prompt users to review your app;...., and we will disallow custom review prompts.

The user experience is therefore much better. But we need to think differently now to get good app ratings.
However, you should also consider whether a user of custom rating dialogs before iOS 10.3 wasn't rather annoyed and you got bad ratings. Especially for us in Germany, the mentality of the users is such that the rating is rather bad than positive.

Another disadvantage of the SKStoreReviewController is the very limited interface. We do not know whether the user really gets the dialog and what action the user has taken.

## When
The API is really easy to use:

```
import UIKit
import StoreKit

class ViewController: UIViewController {
	override func viewDidLoad() {
            super.viewDidLoad()
            SKStoreReviewController.requestReview()
    }
}
```

But remember, we only have three chances to display the review dialogue. It also makes sense to present the dialog to the user only in certain places.

Apple itself writes in the Human Interface Guidelines:

> Ask for a rating only after the user has demonstrated engagement with your app

So we have to think about when a user is engaged and is willing to give a rating. Since this is of course different from app to app, I can only give general tips here.

This criteria should be considered in any case:

1. *Count App Open*
2. *For minor or major updates only*
3. *no app crash lately*

App Specific criteria strongly depend on the structure of the app. Here, certain actions and screen views should be counted. In a news app you think about things like "User has subscribed to 5 categories" and "User commented 3 times on a post". The stricter the criteria, the less often the dialog is played out. <br />
With Firebase Analytics you can measure whether the criteria are fulfilled at all and adjust them if necessary.

## Where
1. *Do not display directly after an action on button or other button.* <br />
Depending on the action I expect a certain behaviour of the app as a user. I add something to the shopping cart and maybe I would like to have a look at it.  A rating dialog would interrupt the user in this example and even in the worst case cause irritation because the user does not expect this behavior after tapping the "Buy" button.
3. *Do not display on screens with long-form content* <br />
Let's stick to the example News App, imagine you are reading a long article concentrated and suddenly an evaluation dialog appears. Are you guys annoyed? I do, because something like this tears me out of the reading flow and I might have to read the paragraph again. This will most likely be the case.

