(function (work) {

    var $mainContent = $('#mainContent'),
        $mediaLists = $('.mediaList'),
        $mediaCard = $('#mediaCard'),
    //  issues in correct transition order
        issueItems = [],
        issuesLeft,
        issuesRight;

    work.lastIssue = '';

    var readyVideo = function () {
        if (brightcove) {
            brightcove.createExperiences();
        }
    };

    var linkerator = function () {
        $(this).attr('target', '_blank');
    };

    var readyLinks = function () {
        $('#mediaCard').find('.content a').each(linkerator);
        $('#mediaCard').find('.sparq-prompt a').each(linkerator);
    };

    var buildIssue = function (data) {

        //  issues assigned to correct DOM position
        issuesLeft = document.createDocumentFragment();
        issuesRight = document.createDocumentFragment();

        issueItems = [];    //empty the transition items

        // first issue item is the hero box
        if (data.Heros && data.Heros.length > 0) {
            var heroBox = $.tmpl('HeroBox', { heroes: data.Heros })[0];
            issuesLeft.appendChild(heroBox);
            issueItems.push(heroBox);
        }

        //  get the functional Shoshin intro text (non-clickable media item)
        if (data.WhatIsShoshin) {
            var marketingTmpl = $.tmpl('MarketingBox', data.WhatIsShoshin);
            issuesRight.appendChild(marketingTmpl[0]);
            issueItems.push(marketingTmpl[0]);
        }

        //  get right rail items
        if (data.RightRail && data.RightRail.length > 0) {
            var railTmpl = $.tmpl('IssueItemRail', data.RightRail);
            for (var i = 0; i < railTmpl.length; i++) {
                issuesRight.appendChild(railTmpl[i]);
                issueItems.push(railTmpl[i]);
            }
        }

        //  get the rest
        if (data.Items && data.Items.length > 0) {
            var itemTmpl = $.tmpl('IssueItem', data.Items);
            for (var i = 0; i < itemTmpl.length; i++) {
                issuesLeft.appendChild(itemTmpl[i]);
                issueItems.push(itemTmpl[i]);
            }
        }

        return issueItems;
    };

    var getCard = function (args) {
        dstar.dataCache.get(dstar.route.getUrl(), function (data) {
            var templateName = args.templateName ? args.templateName : getTmplName(data);
            var html = $.tmpl(templateName, data);
            document.title = dstar.baseTitle + data.Title;

            dstar.transition.toCard(html, {
                issueItems: issueItems,
                $mediaCard: $mediaCard,
                $mediaLists: $mediaLists
            }, function () {
                if (args.callback) {
                    args.callback.call();
                }
                readyLinks();
                dstar.route.next();
            });
        });
    };

    var getTmplName = function (data) {
        var tmplName;

        switch (data.ContentType) {
            case 'Video':
                tmplName = 'VideoCard';
                break;
            case 'Article':
                tmplName = 'ArticleCard';
                break;
            case 'RequiredReading':
                tmplName = 'RequiredReadingCard';
                break;
            default:
                tmplName = 'VideoCard';
        }

        return tmplName;
    };

    var init = function () {
        $mainContent.delegate('li', 'click', function () {
            work.activeElement = $(this);
        });
    };

    $(document).ready(init);

    /**** Controller actions ****/

    work.issue = function (issueSeoName) {

        if (issueSeoName) {
            // save last issue
            work.lastIssue = 'archive/' + issueSeoName;
        }

        dstar.dataCache.get(dstar.route.getUrl(), function (data) {

            buildIssue(data);
            document.title = dstar.baseTitle + data.Title;

            dstar.transition.toIssue(issueItems, {
                issuesLeft: issuesLeft,
                issuesRight: issuesRight,
                $mediaCard: $mediaCard,
                $mediaLists: $mediaLists
            },
            function () {
                // apply carousel plugin only after HTML is in the DOM
                if (data.Heros && data.Heros.length > 1) {
                    $('#loopedSlider').loopedSlider({ autoStart: 15000 });
                } else {
                    // simply show the one hero.  Shouldn't happen often
                    $('.slides div').show();
                }
                dstar.route.next();
            });


        });
    };

    work.archive = function () {
        document.title = dstar.baseTitle + 'Issue Archive';
        var html = $('#issueArchive');
        $('#LastIssue').attr('href', '#!/' + work.lastIssue);
        dstar.transition.toCard(html.clone(), {
            issueItems: issueItems,
            $mediaCard: $mediaCard,
            $mediaLists: $mediaLists
        }, dstar.route.next);
    };

    work.detail = function () {
        getCard({ callback: readyVideo });
    };

    work.faqs = function () {
        getCard({ templateName: 'MarketingCard' });
    };

    work.privacypolicy = function () {
        getCard({ templateName: 'MarketingCard' });
    };

    work.termsofuse = function () {
        getCard({ templateName: 'MarketingCard' });
    };

    work.aboutus = function () {
        getCard({ templateName: 'MarketingCard' });
    };

    work.links = function () {
        getCard({ templateName: 'MarketingCard' });
    };

    work.sparq = function () {
        getCard({ templateName: 'SparqCard' });
    };


})(cb.work = cb.work || {});
