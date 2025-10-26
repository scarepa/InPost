/**
 * @file
 * inpost behaviors.
 */
(function($, Drupal) {
    /**
     * Behavior description.
     */
    Drupal.behaviors.homepageAds = {

        attach: function attach(context, settings) {
            const homeAds = document.querySelector('.home--ads');
            const homeBaner = document.querySelector('.home--baner');
            const homeUrl = window.location.pathname;

            const homeAdsBig = document.querySelector('.home--ads--big');
            const homeAdsBigZone = document.createElement("ins");

            const homeAdsSmallFirst = document.querySelector('.home--ads--small-01');
            const homeAdsZoneSmallFirst = document.createElement("ins");
            const homeAdsSmallSecond = document.querySelector('.home--ads--small-02');
            const homeAdsZoneSmallSecond = document.createElement("ins");

            homeAdsBig.innerText = "";
            homeAdsSmallFirst.innerText = "";
            homeAdsSmallSecond.innerText = "";

            if (homeUrl === "/en" || homeUrl === "/uk" || homeUrl === "/ua") {
                homeAdsBigZone.dataset.reviveZoneid = '23';
                homeAdsZoneSmallFirst.dataset.reviveZoneid = '38';
                homeAdsZoneSmallSecond.dataset.reviveZoneid = '40';
            } else {
                homeAdsBigZone.dataset.reviveZoneid = '22';
                homeAdsZoneSmallFirst.dataset.reviveZoneid = '39';
                homeAdsZoneSmallSecond.dataset.reviveZoneid = '41';
            }

            homeAdsBigZone.dataset.reviveTarget = '_blank';
            homeAdsBigZone.dataset.reviveId = 'eb76d0b259467288a34ef7962f7d79d1';
            homeAdsBig.appendChild(homeAdsBigZone);

            homeAdsZoneSmallFirst.dataset.reviveTarget = '_blank';
            homeAdsZoneSmallFirst.dataset.reviveId = 'eb76d0b259467288a34ef7962f7d79d1';
            homeAdsSmallFirst.appendChild(homeAdsZoneSmallFirst);

            homeAdsZoneSmallSecond.dataset.reviveTarget = '_blank';
            homeAdsZoneSmallSecond.dataset.reviveId = 'eb76d0b259467288a34ef7962f7d79d1';
            homeAdsSmallSecond.appendChild(homeAdsZoneSmallSecond);

            function detectedblock() {
                const homeAds2 = document.querySelector('.home--ads');
                const homeBaner2 = document.querySelector('.home--baner');
                if (!document.getElementById('qxEPubdrQIpk')) {
                    homeAds2.classList.toggle('--hideads');
                    homeBaner2.classList.toggle('--showads');
                } else {
                    if (homeAds2.offsetHeight < 16) {
                        homeAds2.classList.toggle('--hideads');
                        homeBaner2.classList.toggle('--showads');
                    }
                }
            };
            setTimeout(function() {
                detectedblock();
            }, 2300);
        }
    };
})(jQuery, Drupal);