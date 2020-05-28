package com.luhao.webService.webService002;

import com.nstc.framework.core.Caller;
import com.nstc.framework.dto.BizEvent;
import com.nstc.framework.dto.BizEventResponse;
import com.nstc.framework.server.EventServer;

import java.util.List;

/**
 * <p>Title: EventServerImpl.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-05-20 12:06
 */
public class EventServerImpl implements EventServer {

    @Override
    public List execute(Caller caller, List list) {
        return null;
    }

    @Override
    public List execute(Caller caller, BizEvent[] bizEvents) {
        return null;
    }

    @Override
    public BizEventResponse execute(Caller caller, BizEvent bizEvent) {
        return null;
    }
}
