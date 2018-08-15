// TODO this can be removed after upgrading to ext-react@6.5.1

Ext.define('Kitchensink.override.util.sizemonitor.Abstract', {
    override: 'Ext.util.sizemonitor.Abstract',
    
    refresh: function() {
        if (this.destroying || this.destroyed) {
            return;
        }

        this.refreshSize();

        // We should always refresh the monitors regardless of whether or not refreshSize
        // resulted in a new size.  This avoids race conditions in situations such as
        // panel placeholder expand where we layout the panel in its expanded state momentarily
        // just so we can measure its animation destination.  
        Ext.TaskQueue.requestWrite('refreshMonitors', this);
    }
});