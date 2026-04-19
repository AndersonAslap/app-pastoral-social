class CustomLogger {
  private formatMessage(functionName: string, message: string, data?: any): string {
    const timestamp = new Date().toLocaleTimeString();
    let logMessage = `[${timestamp}] ${functionName}: ${message}`;
    
    if (data !== undefined && data !== null) {
      if (typeof data === 'object') {
        logMessage += `\n${JSON.stringify(data, null, 2)}`;
      } else {
        logMessage += `\n${data}`;
      }
    }
    
    return logMessage;
  }

  public log(functionName: string, message: string, data?: any): void {
    const formatted = this.formatMessage(functionName, message, data);
    console.log(formatted);
  }

  public info(functionName: string, message: string, data?: any): void {
    const formatted = this.formatMessage(functionName, message, data);
    console.info('ℹ️ ' + formatted);
  }

  public success(functionName: string, message: string, data?: any): void {
    const formatted = this.formatMessage(functionName, message, data);
    console.log('✅ ' + formatted);
  }

  public warn(functionName: string, message: string, data?: any): void {
    const formatted = this.formatMessage(functionName, message, data);
    console.warn('⚠️ ' + formatted);
  }

  public error(functionName: string, message: string, data?: any): void {
    const formatted = this.formatMessage(functionName, message, data);
    console.error('❌ ' + formatted);
  }

  public debug(functionName: string, message: string, data?: any): void {
    const formatted = this.formatMessage(functionName, message, data);
    console.debug('🐛 ' + formatted);
  }
}

export const logger = new CustomLogger();