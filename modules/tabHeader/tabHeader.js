var tab_headerContainer = document.getElementsByClassName('fixed-top')[0];
var tab_elemContainer = `
    <div id="ugt-tab-header" class="ugt-tab-header">
        <div class="container">
            <ul>
                <li><a href='https://ugt.ge/'>ugt</a></li>
                <li><a href='https://ugtcloud.ge/'>service</a></li>
                <li><a href='https://cloud.ugt.ge/' class="active">online shopping</a></li>
            </ul>
        </div>
    </div>`;
    tab_headerContainer.appendChild(tab_elemContainer);